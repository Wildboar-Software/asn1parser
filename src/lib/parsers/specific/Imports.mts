import {
  assert,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
