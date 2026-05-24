import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TextInteger ::= identifier`
 */
export const TextInteger: Parser = recursiveParser(
  (): Parser => literal(ProductionType.identifier, ProductionType.TextInteger)
);
export default TextInteger;
