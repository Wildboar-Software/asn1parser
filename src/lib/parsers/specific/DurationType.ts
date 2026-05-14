import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `DurationType ::= DURATION`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._DURATION, ProductionType.DurationType)
);
