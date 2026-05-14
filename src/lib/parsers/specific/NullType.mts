import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `NullType ::= NULL`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._NULL, ProductionType.NullType)
);
