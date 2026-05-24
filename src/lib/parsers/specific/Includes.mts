import { literal, optional, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Includes ::= INCLUDES | empty`
 */
export const Includes: Parser = recursiveParser(
  (): Parser => optional(literal(ProductionType._INCLUDES))
);
export default Includes;
