import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RealType ::= REAL`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._REAL, ProductionType.RealType)
);
