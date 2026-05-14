import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ChoiceValue ::= identifier ":" Value`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ChoiceValue, [
      literal(ProductionType.identifier),
      literal(ProductionType.colon),
      parserFor.Value,
    ])
);
