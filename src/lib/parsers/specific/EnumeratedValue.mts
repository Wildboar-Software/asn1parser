import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EnumeratedValue ::= identifier`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType.identifier, ProductionType.EnumeratedValue)
);
