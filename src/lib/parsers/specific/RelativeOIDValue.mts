import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `RelativeOIDValue ::= "{" RelativeOIDComponentsList "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.RelativeOIDValue, [
      literal(ProductionType.curlyOpening),
      parserFor.RelativeOIDComponentsList,
      literal(ProductionType.curlyClosing),
    ])
);
