import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Row ::= number`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.Row)
);
