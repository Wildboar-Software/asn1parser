import {
  assert,
  choiceOf,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import SymbolsExported from './SymbolsExported.js';
import * as parserFor from '../specific/index.js';

/**
 * `Exports ::= EXPORTS SymbolsExported ";" | EXPORTS ALL ";" | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.Exports, [
        literal(ProductionType._EXPORTS),
        assert(
          choiceOf([literal(ProductionType._ALL), SymbolsExported]),
          literal(ProductionType.semiColon),
          'A4A57D58-7DED-4A17-80DB-BEDFACD4E3DA'
        ),
        assert(
          literal(ProductionType.semiColon),
          parserFor.Imports,
          'BBF0AC47-A8D0-4879-8868-40B6937ECA45'
        ),
      ])
    )
);
