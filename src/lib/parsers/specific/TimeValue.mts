import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TimeValue ::= tstring`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.tstring, ProductionType.TimeValue)
);
