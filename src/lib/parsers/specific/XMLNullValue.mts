import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLNullValue ::= empty`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.empty, ProductionType.XMLNullValue)
);
