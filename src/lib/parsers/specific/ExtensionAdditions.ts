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
 * `ExtensionAdditions ::= "," ExtensionAdditionList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.ExtensionAdditions, [
        literal(ProductionType.comma),
        parserFor.ExtensionAdditionList,
      ])
    )
);
