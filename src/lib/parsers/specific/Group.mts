import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Group ::= number`
 */
export const Group: Parser = recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.Group)
);
export default Group;
