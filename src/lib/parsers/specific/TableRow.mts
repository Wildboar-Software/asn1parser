import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TableRow ::= number`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.TableRow)
);
