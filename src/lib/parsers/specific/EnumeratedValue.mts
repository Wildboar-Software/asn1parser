import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EnumeratedValue ::= identifier`
 */
export const EnumeratedValue: Parser = recursiveParser(
  (): Parser =>
    literal(ProductionType.identifier, ProductionType.EnumeratedValue)
);
export default EnumeratedValue;
