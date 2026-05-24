import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TableColumn ::= number`
 */
export const TableColumn: Parser = recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.TableColumn)
);
export default TableColumn;
