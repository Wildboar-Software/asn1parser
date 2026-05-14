import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLNullValue ::= empty`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.empty, ProductionType.XMLNullValue)
);
