import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TableColumn ::= number`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.TableColumn)
);
