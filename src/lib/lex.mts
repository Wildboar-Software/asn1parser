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
 * ASN.1 `realnumber` (X.680 12.9):
 * `number "." *decimal-digit [exponent]` or
 * `number [ "." *decimal-digit ] exponent`.
 * Sticky so it matches at `lastIndex` without copying the rest of the input.
 */
const REALNUMBER: RegExp = /(0|[1-9]\d*)(?:\.\d*(?:[eE]-?\d+)?|[eE]-?\d+)/y;

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
  // `-1` means the end is not known yet. Using `tokenEndIndex > tokenStartIndex`
  // cannot represent a zero-length token and treated `indexOf === -1` then `+ 1`
  // as "still scanning" when the token started at 0.
  let tokenEndIndex: number = -1;
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
  let tokenStartLineNumber: number = lineNumber;
  let tokenStartColumnNumber: number = columnOfLineStart;
  let blockCommentDepth: number = 0;
  // After matching `/*` or `*/`, skip the rest of that two-character delimiter
  // so the opener cannot overlap a closer (`/*/` is not closed). Nesting is
  // tracked only by `blockCommentDepth`; this is not per-level state.
  let blockCommentResumeAt: number = 0;

  // Used in detecting the end of single-line comments.
  function isAtStartOfNewlineSequence(): boolean {
    return (
      newlineWhitespaceCharacters.has(str.charCodeAt(i)) &&
      str.charCodeAt(i - 1) !== CR
    );
  }

  function theEndOfTheCurrentTokenIsKnown(): boolean {
    return tokenEndIndex !== -1;
  }

  /**
   * End an `identifier` or `typereference`. `--` starts a comment, so it is
   * not part of the name (X.680 also forbids consecutive hyphens here).
   * Trailing hyphen is an error. Keywords win; remaining all-caps
   * typereferences become `objectclassreference`.
   */
  function finishIdentifierLikeToken(): void {
    const atTheEnd: boolean = i === str.length;
    const characterCode: number = str.charCodeAt(i);
    const ended: boolean =
      atTheEnd ||
      !isIdentifierCharacter(characterCode) ||
      (!atTheEnd &&
        characterCode === 0x2d &&
        str.charCodeAt(i + 1) === 0x2d);
    if (!ended) {
      return;
    }
    tokenEndIndex = i;
    if (str.charCodeAt(tokenEndIndex - 1) === 0x2d) {
      const ident: string = str.slice(tokenStartIndex, tokenEndIndex);
      throw new ASN1SyntaxError(
        new Production(ProductionType.SYNTAX_ERROR, [], {
          startIndex: tokenStartIndex + base,
          endIndex: tokenEndIndex + base,
          lineNumber: tokenStartLineNumber,
          columnNumber: tokenStartColumnNumber,
        }),
        `Identifier '${ident}' may not end with a hyphen.`,
      );
    }
    const token: string = str.slice(tokenStartIndex, tokenEndIndex);
    const keywordType = keywordToTokenMap.get(token);
    if (keywordType) {
      tokenType = keywordType;
    } else if (
      tokenType === ProductionType.typereference &&
      token.toUpperCase() === token
    ) {
      tokenType = ProductionType.objectclassreference;
    }
  }

  while (tokenStartIndex < str.length) {
    const atTheEnd: boolean = i === str.length;
    if (!theEndOfTheCurrentTokenIsKnown()) {
      switch (tokenType) {
        case ProductionType.empty: {
          switch (str[i]) {
            case '-': {
              if (str.startsWith('--', i)) {
                tokenType = ProductionType.comment;
              } else {
                tokenType = ProductionType.hyphen;
                tokenEndIndex = i + 1;
              }
              break;
            }
            case '/': {
              if (str.startsWith('/*', i)) {
                tokenType = ProductionType.comment;
                blockCommentDepth = 1;
                // Do not match `*/` against the opener (`/*/` is not closed).
                blockCommentResumeAt = i + 2;
              } else {
                tokenType = ProductionType.forwardSlash;
                tokenEndIndex = i + 1;
              }
              break;
            }
            case '"': {
              // `""` embeds a quotation mark. `indexOf === -1` must break:
              // otherwise `str[-1 + 1]` is the opener `"` and this loops forever.
              tokenType = ProductionType.cstring;
              let indexOfNextDoubleQuote: number = str.indexOf('"', i + 1);
              while (
                indexOfNextDoubleQuote !== -1 &&
                str[indexOfNextDoubleQuote + 1] === '"'
              ) {
                indexOfNextDoubleQuote = str.indexOf(
                  '"',
                  indexOfNextDoubleQuote + 2
                );
              }
              if (indexOfNextDoubleQuote === -1) {
                throw new ASN1SyntaxError(
                  new Production(ProductionType.SYNTAX_ERROR, [], {
                    startIndex: tokenStartIndex + base,
                    endIndex: str.length + base,
                    lineNumber: tokenStartLineNumber,
                    columnNumber: tokenStartColumnNumber,
                  }),
                  `Unterminated cstring at index ${i}.`,
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
                lineNumber: tokenStartLineNumber,
                columnNumber: tokenStartColumnNumber,
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
                  if (!/^[01 \t\r\n\f\v\u00A0]*$/.test(innards)) {
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
                  if (!/^[0-9A-F \t\r\n\f\v\u00A0]*$/.test(innards)) {
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
              if (str.startsWith('::=', i)) {
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
                REALNUMBER.lastIndex = i;
                const match: RegExpExecArray | null = REALNUMBER.exec(str);
                if (match) {
                  /**
                   * This fixes an issue where a realnumber is
                   * accidentally lexed from a range (e.g. "9..10" will
                   * be read as realnumber "9.", period, "10".)
                   */
                  if (str.startsWith('..', i + match[0].length - 1)) {
                    tokenType = ProductionType.number;
                    break;
                  }
                  tokenType = ProductionType.realnumber;
                  tokenEndIndex = i + match[0].length;
                } else if (
                  // X.680 12.8: `number` is `0` or a non-zero digit plus digits.
                  characterCode === 0x30 &&
                  i + 1 < str.length &&
                  str.charCodeAt(i + 1) >= 0x30 &&
                  str.charCodeAt(i + 1) <= 0x39
                ) {
                  tokenType = ProductionType.SYNTAX_ERROR;
                  let end: number = i + 2;
                  while (
                    end < str.length &&
                    str.charCodeAt(end) >= 0x30 &&
                    str.charCodeAt(end) <= 0x39
                  ) {
                    end++;
                  }
                  tokenEndIndex = end;
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
                if (str.startsWith('\r\n', i)) {
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

              /**
               * A character that cannot start any ASN.1 lexeme. Emit it as
               * `SYNTAX_ERROR` instead of leaving `tokenType` empty, which
               * would swallow the character into the next token or spin until
               * the infinite-loop guard.
               */
              if (tokenType === ProductionType.empty && i < str.length) {
                tokenType = ProductionType.SYNTAX_ERROR;
                tokenEndIndex = i + 1;
              }
            }
          }
          break;
        }
        case ProductionType.comment: {
          if (str[tokenStartIndex] === '-') {
            if (atTheEnd) {
              tokenEndIndex = i;
            } else if (
              // Do not match `--` against the opener (`---` is not closed).
              i >= tokenStartIndex + 2 &&
              str.startsWith('--', i)
            ) {
              tokenEndIndex = i + 2;
            } else if (isAtStartOfNewlineSequence()) {
              tokenEndIndex = i;
            }
          } else if (str[tokenStartIndex] === '/') {
            if (atTheEnd) {
              throw new ASN1SyntaxError(
                new Production(ProductionType.SYNTAX_ERROR, [], {
                  startIndex: tokenStartIndex + base,
                  endIndex: str.length + base,
                  lineNumber: tokenStartLineNumber,
                  columnNumber: tokenStartColumnNumber,
                }),
                'Unterminated comment.',
              );
            }
            if (i >= blockCommentResumeAt) {
              if (str.startsWith('/*', i)) {
                blockCommentDepth++;
                blockCommentResumeAt = i + 2;
              } else if (str.startsWith('*/', i)) {
                blockCommentDepth--;
                if (blockCommentDepth === 0) {
                  tokenEndIndex = i + 2;
                } else {
                  blockCommentResumeAt = i + 2;
                }
              }
            }
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
        case ProductionType.identifier:
        case ProductionType.typereference: {
          finishIdentifierLikeToken();
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
     * When the token is complete, `i` already equals `tokenEndIndex` (the
     * first character of the next token). Yield without incrementing, or
     * that character would be skipped. Otherwise walk `i` one character
     * at a time so line tracking stays current even inside comments and
     * strings whose end is already known.
     */
    if (i === tokenEndIndex && theEndOfTheCurrentTokenIsKnown()) {
      yield new Production(tokenType, [], {
        startIndex: tokenStartIndex + base,
        endIndex: tokenEndIndex + base,
        lineNumber: tokenStartLineNumber,
        columnNumber: tokenStartColumnNumber,
      });
      tokenStartIndex = tokenEndIndex;
      tokenEndIndex = -1;
      tokenType = ProductionType.empty;
      tokenStartLineNumber = lineNumber;
      tokenStartColumnNumber = columnNumberAt(
        tokenStartIndex,
        lineStartIndex,
        columnOfLineStart,
      );
    } else {
      if (isAtStartOfNewlineSequence()) {
        lineNumber++;
        lineStartIndex = i + (str.startsWith('\r\n', i) ? 2 : 1);
        columnOfLineStart = 1;
      }
      i++;
    }

    // There should never be more loops than there are characters in `str`,
    // but we x4 it here, just in case I am forgetting something.
    if (loops > str.length * 4) {
      throw new ASN1ParserExpectationError(
        'Lexer caught in infinite loop.',
        new Production(ProductionType.SYNTAX_ERROR, [], {
          startIndex: tokenStartIndex + base,
          endIndex:
            (tokenEndIndex === -1 ? tokenStartIndex : tokenEndIndex) + base,
          lineNumber: tokenStartLineNumber,
          columnNumber: tokenStartColumnNumber,
        }),
      );
    }
    loops++;
  }
}
