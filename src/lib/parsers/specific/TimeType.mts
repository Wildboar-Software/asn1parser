import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TimeType ::= TIME`
 */
export const TimeType: Parser = recursiveParser(
  (): Parser => literal(ProductionType._TIME, ProductionType.TimeType)
);
export default TimeType;
