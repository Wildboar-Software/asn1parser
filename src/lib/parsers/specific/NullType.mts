import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `NullType ::= NULL`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._NULL, ProductionType.NullType)
);
