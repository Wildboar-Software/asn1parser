import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `NamedConstraint ::= identifier ComponentConstraint`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.NamedConstraint, [
      literal(ProductionType.identifier),
      parserFor.ComponentConstraint,
    ])
);
