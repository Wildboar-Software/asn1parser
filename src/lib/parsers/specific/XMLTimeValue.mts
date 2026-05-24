import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLTimeValue ::= xmltstring`
 */
export const XMLTimeValue: Parser = recursiveParser(
  (): Parser => literal(ProductionType.xmltstring, ProductionType.XMLTimeValue)
);
export default XMLTimeValue;
