import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DurationType ::= DURATION`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._DURATION, ProductionType.DurationType)
);
