import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Plane ::= number`
 */
export const Plane: Parser = recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.Plane)
);
export default Plane;
