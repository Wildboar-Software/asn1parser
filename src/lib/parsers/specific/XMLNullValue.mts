import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLNullValue ::= empty`
 */
export const XMLNullValue: Parser = recursiveParser(
  (): Parser => literal(ProductionType.empty, ProductionType.XMLNullValue)
);
export default XMLNullValue;
