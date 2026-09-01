import Production from './Production.mjs';
import { ProductionType, TerminalProductionType } from './ProductionType.mjs';
import keywordToTokenMap from './maps/keywordToTokenMap.mjs';
import specialCharacterToTokenMap from './maps/specialCharacterToTokenMap.mjs';
import newlineWhitespaceCharacters from './newlineWhitespaceCharacters.mjs';
import nonNewlineWhitespaceCharacters from './nonNewlineWhitespaceCharacters.mjs';
import type Location from './interfaces/Location.mjs';
import ASN1SyntaxError from './errors/ASN1SyntaxError.mjs';
import ASN1ParserExpectationError from './errors/ASN1ParserExpectationError.mjs';

/**
 * Carriage return.
 * @constant
 */
const CR: number = '\r'.charCodeAt(0);

/**
 * @summary Determine whether a character could be part of an `identifier`.
 * @description
 * Returns a `boolean` indicating whether the supplied character code is for
 * a character that could be a part of an `identifier`.
 * @param {number} characterCode The character code of the character that is
 *  to be analyzed.
 * @returns {boolean} Whether the character could be a valid part of an
 *  `identifier`.
 */
function isIdentifierCharacter(characterCode: number): boolean {
  return (
    (characterCode >= 0x30 && characterCode <= 0x39) ||
    (characterCode >= 0x41 && characterCode <= 0x5a) ||
    (characterCode >= 0x61 && characterCode <= 0x7a) ||
    characterCode === 0x2d
  );
}

/**
 * @summary Compute the one-indexed column number of a substring index.
 * @description
 * `startloc` is the location of `str[0]`. Until a newline is seen,
 * `lineStartIndex` is `0` and `columnOfLineStart` is `startloc.columnNumber`,
 * so index `0` reports that column. After a newline, `lineStartIndex` is the
 * first character of the new line in `str` and `columnOfLineStart` is `1`.
 *
 * @param {number} index The substring-relative index of the character.
 * @param {number} lineStartIndex The substring-relative index of the first
 *  character of the current line that appears in `str` (`0` before any
 *  newline).
 * @param {number} columnOfLineStart The one-indexed column of the character
 *  at `lineStartIndex`.
 * @returns {number} The one-indexed column number of `index`.
 * @author Cursor Grok 4.6
 */
function columnNumberAt(
  index: number,
  lineStartIndex: number,
  columnOfLineStart: number,
): number {
  return columnOfLineStart + (index - lineStartIndex);
}

/**
 * @summary Whether `index` is the first character of a newline sequence.
 * @description
 * Carriage return followed by line feed is treated as a single newline, so the
 * line feed that follows a carriage return is not a new newline start.
 *
 * @param {string} str The text being scanned.
 * @param {number} index The index to inspect.
 * @returns {boolean} Whether a newline sequence begins at `index`.
 * @author Cursor Grok 4.6
 */
function isNewlineSequenceStart(str: string, index: number): boolean {
  return (
    newlineWhitespaceCharacters.has(str.charCodeAt(index)) &&
    str.charCodeAt(index - 1) !== CR
  );
}

/**
 * @summary Length of the newline sequence beginning at `index`.
 * @description
 * Returns `2` for a carriage-return / line-feed pair and `1` for any other
 * recognized newline character.
 *
 * @param {string} str The text being scanned.
 * @param {number} index The index of the first character of the newline.
 * @returns {number} The number of characters in the newline sequence.
 * @author Cursor Grok 4.6
 */
function newlineSequenceLength(str: string, index: number): number {
  return str.startsWith('\r\n', index) ? 2 : 1;
}

/**
 * @summary Advance line and column tracking through newlines in a token.
 * @description
 * ASN.1 block comments, character strings, and bstring / hstring values may
 * contain newline characters while still being a single lexical token. Line
 * numbers and column numbers of later tokens are wrong unless those embedded
 * newlines update the current line after the token is emitted.
 *
 * @param {string} str The ASN.1 text being lexed.
 * @param {number} fromIndex Inclusive start index of the range already yielded.
 * @param {number} toIndex Exclusive end index of the range already yielded.
 * @param {number} lineNumber The one-indexed line number at `fromIndex`.
 * @param {number} lineStartIndex The substring-relative index of the first
 *  character of the current line that appears in `str`.
 * @param {number} columnOfLineStart The one-indexed column of the character
 *  at `lineStartIndex`. After a newline this becomes `1`.
 * @returns {{ lineNumber: number, lineStartIndex: number, columnOfLineStart: number }}
 *  Line tracking for the character at `toIndex`.
 * @author Cursor Grok 4.6
 */
function advanceLineTrackingAfterRange(
  str: string,
  fromIndex: number,
  toIndex: number,
  lineNumber: number,
  lineStartIndex: number,
  columnOfLineStart: number,
): {
  lineNumber: number;
  lineStartIndex: number;
  columnOfLineStart: number;
} {
  let i: number = fromIndex;
  while (i < toIndex) {
    if (isNewlineSequenceStart(str, i)) {
      const length: number = newlineSequenceLength(str, i);
      lineNumber++;
      lineStartIndex = i + length;
      columnOfLineStart = 1;
      i += length;
      continue;
    }
    i++;
  }
  return { lineNumber, lineStartIndex, columnOfLineStart };
}

/**
 * @summary Convert ASN.1 into a sequence of lexical tokens.
 * @description
 * This function takes a `string` containing raw ASN.1 text. This text does not
 * have to contain entire modules. Any section of ASN.1 will be valid.
 *
 * @param {string} str The raw ASN.1 text that is to be lexed.
 * @param {Location} [startloc] The location of `str[0]` in the original
 *  document. Used when `str` is a substring being re-lexed (as in `correct()`):
 *  `startloc.startIndex` is added to every token's `startIndex` and
 *  `endIndex`, and the character at index `0` is at `startloc.lineNumber` /
 *  `startloc.columnNumber`.
 * @yields {Production<TerminalProductionType>} Lexical tokens.
 * @returns An `IterableIterator` that yields lexical tokens.
 * @function
 * @generator
 */
export default function* lex(
  str: string,
  startloc?: Location,
): IterableIterator<Production<TerminalProductionType>, void> {
  if (!str || str.length === 0) {
    return;
  }

  let tokenType: TerminalProductionType = ProductionType.empty;
  let tokenStartIndex: number = 0;
  let tokenEndIndex: number = 0;
  let i: number = 0;
  let loops: number = 0;

  /**
   * `startloc` is the location of `str[0]`. Offsets in `str` are relative to
   * that character: add `base` to get original-document indices, and the
   * first token is on `lineNumber` at `columnOfLineStart`.
   */
  const base: number = startloc?.startIndex ?? 0;
  let lineNumber: number = startloc?.lineNumber ?? 1;
  let lineStartIndex: number = 0;
  let columnOfLineStart: number = startloc?.columnNumber ?? 1;

  // Used in detecting the end of single-line comments.
  function isAtStartOfNewlineSequence(): boolean {
    return isNewlineSequenceStart(str, i);
  }

  function theEndOfTheCurrentTokenIsKnown(): boolean {
    return tokenEndIndex > tokenStartIndex;
  }

  while (tokenStartIndex < str.length) {
    const atTheEnd: boolean = i === str.length;
    if (!theEndOfTheCurrentTokenIsKnown()) {
      switch (tokenType) {
        case ProductionType.empty: {
          switch (str[i]) {
            case '-': {
              if (str.indexOf('--', i) === i) {
                tokenType = ProductionType.comment;
              } else {
                tokenType = ProductionType.hyphen;
                tokenEndIndex = i + 1;
              }
              break;
            }
            case '/': {
              if (str.indexOf('/*', i) === i) {
                tokenType = ProductionType.comment;
              } else {
                tokenType = ProductionType.forwardSlash;
                tokenEndIndex = i + 1;
              }
              break;
            }
            case '"': {
              // TODO: Does this handle double doubles ""?
              tokenType = ProductionType.cstring;
              let indexOfNextDoubleQuote: number = str.indexOf('"', i + 1);
              while (str[indexOfNextDoubleQuote + 1] === '"') {
                indexOfNextDoubleQuote = str.indexOf(
                  '"',
                  indexOfNextDoubleQuote + 2
                );
              }
              tokenEndIndex = indexOfNextDoubleQuote + 1;
              break;
            }
            case "'": {
              const indexOfNextSingleQuote: number = str.indexOf("'", i + 1);
              let errloc: Location = {
                startIndex: tokenStartIndex + base,
                endIndex: str.length + base,
                lineNumber,
                columnNumber: columnNumberAt(tokenStartIndex, lineStartIndex, columnOfLineStart),
              };
              if (
                indexOfNextSingleQuote === -1 ||
                indexOfNextSingleQuote === str.length - 1
              ) {
                throw new ASN1SyntaxError(
                  new Production(ProductionType.SYNTAX_ERROR, [], errloc),
                  `Unterminated single-quoted token at index ${i}.`
                );
              }
              errloc = {
                ...errloc,
                endIndex: indexOfNextSingleQuote + 1,
              };
              switch (str[indexOfNextSingleQuote + 1]) {
                case 'B': {
                  tokenType = ProductionType.bstring;
                  tokenEndIndex = indexOfNextSingleQuote + 2;
                  const innards = str.slice(
                    tokenStartIndex + 1,
                    indexOfNextSingleQuote
                  );
                  if (!/^[01 \t\r\n\f\v]*$/g.test(innards)) {
                    throw new ASN1SyntaxError(
                      new Production(ProductionType.SYNTAX_ERROR, [], errloc),
                      `Invalid bstring: '${innards}'B.`,
                    );
                  }
                  break;
                }
                case 'H': {
                  tokenType = ProductionType.hstring;
                  tokenEndIndex = indexOfNextSingleQuote + 2;
                  const innards = str.slice(
                    tokenStartIndex + 1,
                    indexOfNextSingleQuote
                  );
                  if (!/^[0-9A-F \t\r\n\f\v]*$/g.test(innards)) {
                    throw new ASN1SyntaxError(
                      new Production(ProductionType.SYNTAX_ERROR, [], errloc),
                      `Invalid hstring: '${innards}'H.`,
                    );
                  }
                  break;
                }
                default: {
                  throw new ASN1SyntaxError(
                    new Production(ProductionType.SYNTAX_ERROR, [], errloc),
                    `Unrecognized single-quoted token at index ${i}.`
                  );
                }
              }
              break;
            }
            case ':': {
              if (str.indexOf('::=', i) === i) {
                tokenType = ProductionType.assignment;
                tokenEndIndex = i + 3;
              } else {
                tokenType = ProductionType.colon;
                tokenEndIndex = i + 1;
              }
              break;
            }
            default: {
              const specialCharacterTokenType = specialCharacterToTokenMap.get(
                str.charAt(i)
              );
              if (specialCharacterTokenType) {
                tokenType = specialCharacterTokenType;
                tokenEndIndex = i + 1;
              }

              const characterCode = str.charCodeAt(i);

              if (characterCode >= 0x30 && characterCode <= 0x39) {
                const fractionalRealMatch: RegExpExecArray | null =
                  /^(0|(?:[1-9]\d*))\.\d*(?:(e|E)-?\d+)?/.exec(str.slice(i));
                const exponentialRealMatch: RegExpExecArray | null =
                  /^(0|(?:[1-9]\d*))\.\d*(e|E)-?\d+/.exec(str.slice(i));
                const match =
                  fractionalRealMatch || exponentialRealMatch || null;
                if (match) {
                  /**
                   * This fixes an issue where a realnumber is
                   * accidentally lexed from a range (e.g. "9..10" will
                   * be read as realnumber "9.", period, "10".)
                   */
                  if (
                    str.indexOf('..', i + match[0].length - 1) ===
                    i + match[0].length - 1
                  ) {
                    tokenType = ProductionType.number;
                    break;
                  }
                  tokenType = ProductionType.realnumber;
                  tokenEndIndex = i + match[0].length;
                } else {
                  tokenType = ProductionType.number;
                }
              }

              if (characterCode >= 0x41 && characterCode <= 0x5a) {
                tokenType = ProductionType.typereference;
              }

              if (characterCode >= 0x61 && characterCode <= 0x7a) {
                tokenType = ProductionType.identifier;
              }

              if (isAtStartOfNewlineSequence()) {
                tokenType = ProductionType.newlineWhitespace;
                if (str.indexOf('\r\n', i) === i) {
                  // Unite CRLF into a single newline.
                  tokenEndIndex = i + 2;
                } else {
                  tokenEndIndex = i + 1;
                }
              }

              /**
               * Adjacent whitespace characters are all contatenated into a
               * single "whitespace" production.
               */
              if (nonNewlineWhitespaceCharacters.has(characterCode)) {
                tokenType = ProductionType.nonNewlineWhitespace;
              }
            }
          }
          break;
        }
        case ProductionType.comment: {
          if (str[tokenStartIndex] === '-') {
            if (atTheEnd) {
              tokenEndIndex = i;
            } else if (str.indexOf('--', i) === i) {
              tokenEndIndex = i + 2;
            } else if (isAtStartOfNewlineSequence()) {
              tokenEndIndex = i;
            }
          } else if (
            str[tokenStartIndex] === '/' &&
            str.indexOf('*/', i) === i
          ) {
            tokenEndIndex = i + 2;
          } else if (atTheEnd) {
            throw new ASN1SyntaxError(
              new Production(ProductionType.SYNTAX_ERROR, [], {
                startIndex: tokenStartIndex + base,
                endIndex: str.length + base,
                lineNumber,
                columnNumber: columnNumberAt(tokenStartIndex, lineStartIndex, columnOfLineStart),
              }),
              'Unterminated comment.',
            );
          }
          break;
        }
        case ProductionType.number: {
          if (atTheEnd) {
            tokenEndIndex = i;
            break;
          }
          const characterCode = str.charCodeAt(i);
          if (characterCode < 0x30 || characterCode > 0x39) {
            tokenEndIndex = i;
          }
          break;
        }
        case ProductionType.identifier: {
          const characterCode = str.charCodeAt(i);
          if (
            atTheEnd ||
            !isIdentifierCharacter(characterCode) ||
            /**
             * This condition discontinues lexing an identifier if it encounters
             * two adjacent hyphens. Since two or more adjacent hyphens are not
             * permitted within an identifier, this is correct, but it also has
             * the benefit of allowing line comments to immediately follow an
             * identifier without whitespace between them.
             */
            (!atTheEnd &&
              characterCode === 0x2d &&
              str.charCodeAt(i + 1) === 0x2d)
          ) {
            tokenEndIndex = i;
            if (str.charCodeAt(tokenEndIndex - 1) === 0x2d) {
              const ident = str.slice(tokenStartIndex, tokenEndIndex);
              throw new ASN1SyntaxError(
                new Production(ProductionType.SYNTAX_ERROR, [], {
                  startIndex: tokenStartIndex + base,
                  endIndex: tokenEndIndex + base,
                  lineNumber,
                  columnNumber: columnNumberAt(tokenStartIndex, lineStartIndex, columnOfLineStart),
                }),
                `Identifier '${ident}' may not end with a hyphen.`,
              );
            }
          }
          break;
        }
        case ProductionType.typereference: {
          const characterCode = str.charCodeAt(i);
          if (
            atTheEnd ||
            !isIdentifierCharacter(characterCode) ||
            /**
             * This condition discontinues lexing an identifier if it encounters
             * two adjacent hyphens. Since two or more adjacent hyphens are not
             * permitted within an identifier, this is correct, but it also has
             * the benefit of allowing line comments to immediately follow an
             * identifier without whitespace between them.
             */
            (!atTheEnd &&
              characterCode === 0x2d &&
              str.charCodeAt(i + 1) === 0x2d)
          ) {
            tokenEndIndex = i;
            if (str.charCodeAt(tokenEndIndex - 1) === 0x2d) {
              const ident = str.slice(tokenStartIndex, tokenEndIndex);
              throw new ASN1SyntaxError(
                new Production(ProductionType.SYNTAX_ERROR, [], {
                  startIndex: tokenStartIndex + base,
                  endIndex: tokenEndIndex + base,
                  lineNumber,
                  columnNumber: columnNumberAt(tokenStartIndex, lineStartIndex, columnOfLineStart),
                }),
                `Identifier '${ident}' may not end with a hyphen.`,
              );
            }
          }
          if (tokenEndIndex > tokenStartIndex) {
            const token: string = str.slice(tokenStartIndex, tokenEndIndex);
            const keywordType = keywordToTokenMap.get(token);
            if (keywordType) {
              tokenType = keywordType;
              break;
            }
            if (token.toUpperCase() === token) {
              tokenType = ProductionType.objectclassreference;
              break;
            }
          }
          break;
        }
        case ProductionType.nonNewlineWhitespace: {
          if (atTheEnd) {
            tokenEndIndex = i;
            break;
          }
          // All non-newline whitespace characters are concatenated.
          if (!nonNewlineWhitespaceCharacters.has(str.charCodeAt(i))) {
            tokenEndIndex = i;
          }
          break;
        }
        default: {
          break;
        } // REVIEW: Should this be continue?
      }
    }

    /**
     * The condition (i === tokenEndIndex) forces this to loop through every
     * character in the text, even if the location of the end of the token
     * is known. Line tracking for newlines inside that token (comments,
     * strings, and newline whitespace) is updated after the token is yielded
     * so the token itself still reports its start line and column.
     */
    if (i === tokenEndIndex && tokenEndIndex > tokenStartIndex) {
      yield new Production(tokenType, [], {
        startIndex: tokenStartIndex + base,
        endIndex: tokenEndIndex + base,
        lineNumber,
        columnNumber: columnNumberAt(tokenStartIndex, lineStartIndex, columnOfLineStart),
      });
      ({ lineNumber, lineStartIndex, columnOfLineStart } =
        advanceLineTrackingAfterRange(
          str,
          tokenStartIndex,
          tokenEndIndex,
          lineNumber,
          lineStartIndex,
          columnOfLineStart,
        ));
      tokenStartIndex = tokenEndIndex;
      tokenType = ProductionType.empty;
    } else {
      i++; // TODO: Why is this only done in the "else" case?
    }

    // There should never be more loops than there are characters in `str`,
    // but we x4 it here, just in case I am forgetting something.
    if (loops > str.length * 4) {
      throw new ASN1ParserExpectationError(
        'Lexer caught in infinite loop.',
        new Production(ProductionType.SYNTAX_ERROR, [], {
          startIndex: tokenStartIndex + base,
          endIndex: tokenEndIndex + base,
          lineNumber,
          columnNumber: columnNumberAt(tokenStartIndex, lineStartIndex, columnOfLineStart),
        }),
      );
    }
    loops++;
  }
}
