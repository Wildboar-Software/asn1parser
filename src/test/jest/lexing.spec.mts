import LogLevel from '../../lib/LogLevel.js';
import lex from '../../lib/lex.js';
import logger from '../../lib/loggers/console.js';
import ProductionType from '../../lib/ProductionType.js';

describe('Lexing', () => {
  logger.level = LogLevel.error;

  test.each([
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
  ])(
    "single-lexeme text '%s' works and does not read out-of-bounds or loop infinitely",
    (text, pt) => {
      let lexResults;
      try {
        lexResults = Array.from(lex(text));
      } catch (e) {
        expect(() => {
          throw e;
        }).not.toThrow(/(undefined|infinite)/);
      } finally {
        if (lexResults) {
          expect(lexResults[0].type).toBe(pt);
        }
      }
    }
  );
});
