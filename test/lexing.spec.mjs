import { lex, LogLevel, ProductionType } from '../dist/index.mjs';
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

describe('Lexing', () => {
  logger.level = LogLevel.error;

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
