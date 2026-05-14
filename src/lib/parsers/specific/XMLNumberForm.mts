import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLNumberForm ::= number`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.XMLNumberForm)
);
