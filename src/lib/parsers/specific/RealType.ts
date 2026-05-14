import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `RealType ::= REAL`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._REAL, ProductionType.RealType)
);
