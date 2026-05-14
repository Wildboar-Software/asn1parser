import { literal, optional, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `Includes ::= INCLUDES | empty`
 */
export default recursiveParser(
  (): Parser => optional(literal(ProductionType._INCLUDES))
);
