import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TimeType ::= TIME`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._TIME, ProductionType.TimeType)
);
