import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TimeValue ::= tstring`
 */
export const TimeValue: Parser = recursiveParser(
  (): Parser => literal(ProductionType.tstring, ProductionType.TimeValue)
);
export default TimeValue;
