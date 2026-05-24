import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `PrefixedValue ::= Value`
 */
export const PrefixedValue: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.PrefixedValue, parserFor.Value)
);
export default PrefixedValue;
