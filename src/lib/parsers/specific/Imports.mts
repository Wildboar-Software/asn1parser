import {
  assert,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `Imports ::= IMPORTS SymbolsImported ";" | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.Imports, [
        literal(ProductionType._IMPORTS),
        parserFor.SymbolsImported,
        assert(
          literal(ProductionType.semiColon),
          parserFor.Assignment, // We search for just one, instead of AssignmentList.
          '78D02270-136C-4D4C-AADA-5396A11A40B4'
        ),
      ])
    )
);
