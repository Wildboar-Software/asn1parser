import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Plane ::= number`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.Plane)
);
