import { literal, optional, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Includes ::= INCLUDES | empty`
 */
export default recursiveParser(
  (): Parser => optional(literal(ProductionType._INCLUDES))
);
