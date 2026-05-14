import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLTimeValue ::= xmltstring`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.xmltstring, ProductionType.XMLTimeValue)
);
