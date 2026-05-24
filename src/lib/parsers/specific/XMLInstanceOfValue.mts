import { recursiveParser, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLInstanceOfValue ::= XMLValue`
 */
export const XMLInstanceOfValue: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.XMLInstanceOfValue, parserFor.XMLValue)
);
export default XMLInstanceOfValue;
