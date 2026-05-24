import { recursiveParser, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLPrefixedValue ::= XMLValue`
 */
export const XMLPrefixedValue: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.XMLPrefixedValue, parserFor.XMLValue)
);
export default XMLPrefixedValue;
