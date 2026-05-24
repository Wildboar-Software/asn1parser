import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { literal, recursiveParser } from '../generic/index.mjs';

/**
 * `DateTimeType ::= DATE-TIME`
 */
export const DateTimeType: Parser = recursiveParser(
  (): Parser => literal(ProductionType._DATE_TIME, ProductionType.DateTimeType)
);
export default DateTimeType;
