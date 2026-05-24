import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExtensionAdditionAlternatives ::= "," ExtensionAdditionAlternativesList | empty`
 */
export const ExtensionAdditionAlternatives: Parser = recursiveParser(
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
export default ExtensionAdditionAlternatives;
