import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RelativeOIDValue ::= "{" RelativeOIDComponentsList "}"`
 */
export const RelativeOIDValue: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.RelativeOIDValue, [
      literal(ProductionType.curlyOpening),
      parserFor.RelativeOIDComponentsList,
      literal(ProductionType.curlyClosing),
    ])
);
export default RelativeOIDValue;
