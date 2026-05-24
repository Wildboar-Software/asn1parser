import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TextEnumerated ::= identifier`
 */
export const TextEnumerated: Parser = recursiveParser(
  (): Parser =>
    literal(ProductionType.identifier, ProductionType.TextEnumerated)
);
export default TextEnumerated;
