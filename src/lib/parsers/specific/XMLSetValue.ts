import { aliasFor, optional, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLSetValue ::= XMLComponentValueList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      aliasFor(ProductionType.XMLSetValue, parserFor.XMLComponentValueList)
    )
);
