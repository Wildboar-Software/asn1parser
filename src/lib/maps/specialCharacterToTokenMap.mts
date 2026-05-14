import { LexicalProductionType } from '../ProductionType.mjs';

/**
 * @summary A mapping of special characters to production types.
 * @description
 * This is used by the lexer to emit tokens.
 * @constant
 */
export default new Map<string, LexicalProductionType>([
  ['{', LexicalProductionType.curlyOpening],
  ['}', LexicalProductionType.curlyClosing],
  ['<', LexicalProductionType.lessThan],
  ['>', LexicalProductionType.greaterThan],
  [',', LexicalProductionType.comma],
  ['.', LexicalProductionType.period],
  ['/', LexicalProductionType.forwardSlash],
  ['(', LexicalProductionType.parenthesisOpening],
  [')', LexicalProductionType.parenthesisClosing],
  ['[', LexicalProductionType.squareOpening],
  [']', LexicalProductionType.squareClosing],
  ['-', LexicalProductionType.hyphen],
  [':', LexicalProductionType.colon],
  ['=', LexicalProductionType.equalSign],
  ['"', LexicalProductionType.quotationMark],
  ["'", LexicalProductionType.apostrophe],
  // [ " ", TokenType.space ],
  [';', LexicalProductionType.semiColon],
  ['@', LexicalProductionType.atSign],
  ['|', LexicalProductionType.verticalBar],
  ['!', LexicalProductionType.exclamationPoint],
  ['^', LexicalProductionType.caret],
  ['*', LexicalProductionType.asterisk],
  ['&', LexicalProductionType.ampersand],
]);
