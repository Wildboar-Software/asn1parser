import {
  assert,
  choiceOf,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import SymbolsExported from './SymbolsExported.mjs';
import * as parserFor from '../specific/index.mjs';

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
