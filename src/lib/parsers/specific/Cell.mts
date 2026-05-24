import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Cell ::= number`
 */
export const Cell: Parser = recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.Cell)
);
export default Cell;
