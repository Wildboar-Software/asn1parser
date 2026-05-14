import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExtensionAdditionAlternatives ::= "," ExtensionAdditionAlternativesList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(
        ProductionType.ExtensionAdditionAlternatives,
        [
          literal(ProductionType.comma),
          parserFor.ExtensionAdditionAlternativesList,
        ]
      )
    )
);
