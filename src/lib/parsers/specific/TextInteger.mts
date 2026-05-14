import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TextInteger ::= identifier`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.identifier, ProductionType.TextInteger)
);
