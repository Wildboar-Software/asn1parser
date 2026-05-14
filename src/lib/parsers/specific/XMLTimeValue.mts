import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLTimeValue ::= xmltstring`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.xmltstring, ProductionType.XMLTimeValue)
);
