import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import { literal, recursiveParser } from '../generic/index.js';

/**
 * `DateTimeType ::= DATE-TIME`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._DATE_TIME, ProductionType.DateTimeType)
);
