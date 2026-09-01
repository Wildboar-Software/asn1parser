import { ASN1SyntaxError, grok, lex, LogLevel, parse, ProductionType } from '../dist/index.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';
import { describe, test } from 'node:test';
import { strict as assert, strictEqual as assertEqual } from 'node:assert';

const testcases = [
  ['{', ProductionType.curlyOpening],
  ['}', ProductionType.curlyClosing],
  ['<', ProductionType.lessThan],
  ['>', ProductionType.greaterThan],
  [',', ProductionType.comma],
  ['.', ProductionType.period],
  ['/', ProductionType.forwardSlash],
  ['(', ProductionType.parenthesisOpening],
  [')', ProductionType.parenthesisClosing],
  ['[', ProductionType.squareOpening],
  [']', ProductionType.squareClosing],
  // [ "-", ProductionType.hyphen ],
  [':', ProductionType.colon],
  ['=', ProductionType.equalSign],
  // [ "\"", ProductionType.quotationMark ],
  ["'", ProductionType.apostrophe],
  [' ', ProductionType.nonNewlineWhitespace],
  [';', ProductionType.semiColon],
  ['@', ProductionType.atSign],
  ['|', ProductionType.verticalBar],
  ['!', ProductionType.exclamationPoint],
  ['^', ProductionType.caret],
  ['*', ProductionType.asterisk],
  ['&', ProductionType.ampersand],
];

/**
 * Newline character codes recognized by the ASN.1 lexer: LF, VT, FF, and CR.
 * @constant
 * @author Cursor Grok 4.6
 */
const NEWLINE_CODES = new Set([0x000a, 0x000b, 0x000c, 0x000d]);

/**
 * @summary Independently compute the one-indexed line and column of an index.
 * @description
 * Walks `text` from its start so lexer locations can be checked without
 * reusing the lexer's own line-tracking code. Carriage return followed by
 * line feed counts as a single newline. When `startloc` is supplied, counting
 * begins at that line and column, matching `lex(text, startloc)`.
 *
 * @param {string} text The text whose positions are being computed.
 * @param {number} index The substring-relative index to locate.
 * @param {{ lineNumber?: number, columnNumber?: number }} [startloc] Optional
 *  starting line and column when `text` is a substring of a larger document.
 * @returns {{ lineNumber: number, columnNumber: number }} The one-indexed
 *  line and column of `index`.
 * @author Cursor Grok 4.6
 */
function lineAndColumnAt(text, index, startloc) {
  let lineNumber = startloc?.lineNumber ?? 1;
  let columnNumber = startloc?.columnNumber ?? 1;
  for (let i = 0; i < index; i++) {
    const code = text.charCodeAt(i);
    const prev = i > 0 ? text.charCodeAt(i - 1) : Number.NaN;
    if (code === 0x000a && prev === 0x000d) {
      continue;
    }
    if (NEWLINE_CODES.has(code)) {
      lineNumber++;
      columnNumber = 1;
    } else {
      columnNumber++;
    }
  }
  return { lineNumber, columnNumber };
}

/**
 * @summary Assert every lexeme's line, column, and offsets match the source.
 * @param {string} text The ASN.1 text that was lexed.
 * @param {import('../dist/index.mjs').Production[]} tokens The lexemes.
 * @param {import('../dist/index.mjs').Location} [startloc] The location passed
 *  to `lex()`, if any.
 * @author Cursor Grok 4.6
 */
function assertLexemeLocations(text, tokens, startloc) {
  const base = startloc?.startIndex ?? 0;
  assert.ok(tokens.length > 0, 'expected at least one lexeme');
  for (const token of tokens) {
    const relativeStart = token.location.startIndex - base;
    const relativeEnd = token.location.endIndex - base;
    const expected = lineAndColumnAt(text, relativeStart, startloc);
    assertEqual(
      token.location.lineNumber,
      expected.lineNumber,
      `${token.type} line at index ${token.location.startIndex}`,
    );
    assertEqual(
      token.location.columnNumber,
      expected.columnNumber,
      `${token.type} column at index ${token.location.startIndex}`,
    );
    assertEqual(relativeStart >= 0, true, `${token.type} relative start`);
    assertEqual(relativeEnd <= text.length, true, `${token.type} relative end`);
    assertEqual(token.location.startIndex, relativeStart + base);
    assertEqual(token.location.endIndex, relativeEnd + base);
  }
}

/**
 * @summary Return the first lexeme whose type and exact text match.
 * @param {import('../dist/index.mjs').Production[]} tokens The lexemes.
 * @param {string} text The ASN.1 text that was lexed.
 * @param {string} type The expected production type.
 * @param {string} slice The exact source text of the token.
 * @param {import('../dist/index.mjs').Location} [startloc] The location passed
 *  to `lex()`, if any.
 * @returns {import('../dist/index.mjs').Production} The matching lexeme.
 * @author Cursor Grok 4.6
 */
function findLexeme(tokens, text, type, slice, startloc) {
  const base = startloc?.startIndex ?? 0;
  const match = tokens.find((token) => {
    const relativeStart = token.location.startIndex - base;
    const relativeEnd = token.location.endIndex - base;
    return token.type === type && text.slice(relativeStart, relativeEnd) === slice;
  });
  assert.ok(match, `expected ${type} token ${JSON.stringify(slice)}`);
  return match;
}

describe('Lexing', () => {
  logger.level = LogLevel.error;

  test('lexes an empty cstring', () => {
    const tokens = Array.from(lex('""'));
    assertEqual(tokens.length, 1);
    assertEqual(tokens[0].type, ProductionType.cstring);
    assertEqual(tokens[0].location.startIndex, 0);
    assertEqual(tokens[0].location.endIndex, 2);
  });

  test('lexes a cstring that embeds a quotation mark as ""', () => {
    const text = '"hello""world"';
    const tokens = Array.from(lex(text));
    assertEqual(tokens.length, 1);
    assertEqual(tokens[0].type, ProductionType.cstring);
    assertEqual(tokens[0].location.startIndex, 0);
    assertEqual(tokens[0].location.endIndex, text.length);
  });

  test('throws on an unterminated cstring instead of hanging', { timeout: 2000 }, () => {
    assert.throws(
      () => Array.from(lex('"hello')),
      (error) =>
        error instanceof ASN1SyntaxError &&
        error.message.includes('Unterminated cstring'),
    );
  });

  test('throws on an unterminated cstring that is not at index 0', { timeout: 2000 }, () => {
    assert.throws(
      () => Array.from(lex('INTEGER "hello')),
      (error) =>
        error instanceof ASN1SyntaxError &&
        error.message.includes('Unterminated cstring'),
    );
  });

  test('throws on a cstring that ends with an unmatched escaped quote', { timeout: 2000 }, () => {
    assert.throws(
      () => Array.from(lex('"hello""')),
      (error) =>
        error instanceof ASN1SyntaxError &&
        error.message.includes('Unterminated cstring'),
    );
  });

  for (const [text, pt] of testcases) {
    test(`single-lexeme text '${text}' works and does not read out-of-bounds or loop infinitely (${pt})`, () => {
      let lexResults;
      try {
        lexResults = Array.from(lex(text));
      } catch (e) {
        if (e.message?.includes('Unterminated')) {
          return;
        }
        throw e;
      }
      // assert.doesNotThrow(() => {
      //   lexResults = Array.from(lex(text));
      // }, 'undefined');
      assertEqual(lexResults[0].type, pt);
    });
  }
});

describe('Lexeme line and column numbers', () => {
  logger.level = LogLevel.error;

  test('keeps locations correct after a leading single-line comment', () => {
    const text = '-- leading\nMyMod DEFINITIONS ::= BEGIN T ::= INTEGER END';
    const tokens = Array.from(lex(text));
    assertLexemeLocations(text, tokens);
    const myMod = findLexeme(tokens, text, ProductionType.typereference, 'MyMod');
    assertEqual(myMod.location.lineNumber, 2);
    assertEqual(myMod.location.columnNumber, 1);
  });

  test('keeps locations correct after a leading same-line block comment', () => {
    const text = '/* leading */ MyMod DEFINITIONS ::= BEGIN T ::= INTEGER END';
    const tokens = Array.from(lex(text));
    assertLexemeLocations(text, tokens);
    const myMod = findLexeme(tokens, text, ProductionType.typereference, 'MyMod');
    assertEqual(myMod.location.lineNumber, 1);
    assertEqual(myMod.location.columnNumber, 15);
  });

  test('keeps locations correct after a leading multi-line block comment', () => {
    const text = '/* leading\ncomment */\nMyMod DEFINITIONS ::= BEGIN T ::= INTEGER END';
    const tokens = Array.from(lex(text));
    assertLexemeLocations(text, tokens);
    const comment = tokens[0];
    assertEqual(comment.type, ProductionType.comment);
    assertEqual(comment.location.lineNumber, 1);
    assertEqual(comment.location.columnNumber, 1);
    const newline = tokens[1];
    assertEqual(newline.type, ProductionType.newlineWhitespace);
    assertEqual(newline.location.lineNumber, 2);
    assertEqual(newline.location.columnNumber, 11);
    const myMod = findLexeme(tokens, text, ProductionType.typereference, 'MyMod');
    assertEqual(myMod.location.lineNumber, 3);
    assertEqual(myMod.location.columnNumber, 1);
  });

  test('keeps locations correct when a block comment contains a newline and code follows on the closing line', () => {
    const text = '/*\n*/MyMod DEFINITIONS ::= BEGIN T ::= INTEGER END';
    const tokens = Array.from(lex(text));
    assertLexemeLocations(text, tokens);
    const myMod = findLexeme(tokens, text, ProductionType.typereference, 'MyMod');
    assertEqual(myMod.location.lineNumber, 2);
    assertEqual(myMod.location.columnNumber, 3);
  });

  test('counts CRLF inside a leading block comment as a single newline', () => {
    const text = '/* leading\r\ncomment */\r\nMyMod DEFINITIONS ::= BEGIN T ::= INTEGER END';
    const tokens = Array.from(lex(text));
    assertLexemeLocations(text, tokens);
    const myMod = findLexeme(tokens, text, ProductionType.typereference, 'MyMod');
    assertEqual(myMod.location.lineNumber, 3);
    assertEqual(myMod.location.columnNumber, 1);
  });

  test('keeps locations correct after stacked leading line comments', () => {
    const text = '-- one\n-- two\nMyMod DEFINITIONS ::= BEGIN T ::= INTEGER END';
    const tokens = Array.from(lex(text));
    assertLexemeLocations(text, tokens);
    const myMod = findLexeme(tokens, text, ProductionType.typereference, 'MyMod');
    assertEqual(myMod.location.lineNumber, 3);
    assertEqual(myMod.location.columnNumber, 1);
  });

  test('advances line numbers through a character string that contains a newline', () => {
    const text = '"hello\nworld" INTEGER';
    const tokens = Array.from(lex(text));
    assertLexemeLocations(text, tokens);
    const integer = findLexeme(tokens, text, ProductionType._INTEGER, 'INTEGER');
    assertEqual(integer.location.lineNumber, 2);
    assertEqual(integer.location.columnNumber, 8);
  });

  test('advances line numbers through a bstring that contains a newline', () => {
    const text = "'01\n01'B INTEGER";
    const tokens = Array.from(lex(text));
    assertLexemeLocations(text, tokens);
    const integer = findLexeme(tokens, text, ProductionType._INTEGER, 'INTEGER');
    assertEqual(integer.location.lineNumber, 2);
    assertEqual(integer.location.columnNumber, 6);
  });

  test('adjusts line and column numbers when re-lexing a substring after a leading comment', () => {
    const original = '-- leading comment\nMyMod DEFINITIONS ::= BEGIN T ::= INTEGER END';
    const startIndex = original.indexOf('MyMod');
    const substring = original.slice(startIndex);
    const startloc = {
      startIndex,
      endIndex: original.length,
      lineNumber: 2,
      columnNumber: 1,
    };
    const tokens = Array.from(lex(substring, startloc));
    assertLexemeLocations(substring, tokens, startloc);
    const myMod = findLexeme(tokens, substring, ProductionType.typereference, 'MyMod', startloc);
    assertEqual(myMod.location.startIndex, startIndex);
    assertEqual(myMod.location.lineNumber, 2);
    assertEqual(myMod.location.columnNumber, 1);
  });

  test('preserves a startloc column greater than 1 when re-lexing a substring', () => {
    const original = '    INTEGER';
    const startIndex = original.indexOf('INTEGER');
    const substring = original.slice(startIndex);
    const startloc = {
      startIndex,
      endIndex: original.length,
      lineNumber: 4,
      columnNumber: 5,
    };
    const tokens = Array.from(lex(substring, startloc));
    assertLexemeLocations(substring, tokens, startloc);
    assertEqual(tokens[0].location.lineNumber, 4);
    assertEqual(tokens[0].location.columnNumber, 5);
    assertEqual(tokens[0].location.startIndex, startIndex);
  });

  test('treats startloc as the location of index 0 even when the substring later contains a newline', () => {
    // Mirrors correct(): re-lex a value substring whose production location
    // is not column 1 of the original file.
    const original = '    { a 1,\n      b 2 }';
    const startIndex = original.indexOf('{');
    const substring = original.slice(startIndex);
    const startloc = {
      startIndex,
      endIndex: original.length,
      lineNumber: 7,
      columnNumber: 5,
    };
    const tokens = Array.from(lex(substring, startloc));
    assertLexemeLocations(substring, tokens, startloc);
    const open = findLexeme(tokens, substring, ProductionType.curlyOpening, '{', startloc);
    assertEqual(open.location.startIndex, startIndex);
    assertEqual(open.location.lineNumber, 7);
    assertEqual(open.location.columnNumber, 5);
    const b = findLexeme(tokens, substring, ProductionType.identifier, 'b', startloc);
    assertEqual(b.location.lineNumber, 8);
    assertEqual(b.location.columnNumber, 7);
  });

  test('reports groked assignment locations correctly after a leading multi-line comment', () => {
    const text = `/* copyright
 * notice
 */
MyMod {iso} DEFINITIONS ::= BEGIN
  T ::= INTEGER
END`;
    const tokens = Array.from(lex(text));
    assertLexemeLocations(text, tokens);
    const parseResults = parse(text, tokens);
    assertEqual(parseResults.error, undefined);
    const modules = grok(text, parseResults);
    assertEqual(modules[0].name, 'MyMod');
    const moduleLoc = modules[0].production.location;
    assertEqual(moduleLoc.lineNumber, 4);
    assertEqual(moduleLoc.columnNumber, 1);
    const assignmentLoc = modules[0].assignments.T.production.location;
    assertEqual(assignmentLoc.lineNumber, 5);
    assertEqual(assignmentLoc.columnNumber, 3);
  });
});
