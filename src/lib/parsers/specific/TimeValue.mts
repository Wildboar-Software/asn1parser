import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TimeValue ::= tstring`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.tstring, ProductionType.TimeValue)
);
