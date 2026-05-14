import { recursiveParser, aliasFor } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLInstanceOfValue ::= XMLValue`
 */
export default recursiveParser(
  (): Parser => aliasFor(ProductionType.XMLInstanceOfValue, parserFor.XMLValue)
);
