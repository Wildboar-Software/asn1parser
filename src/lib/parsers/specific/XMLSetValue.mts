import { aliasFor, optional, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLSetValue ::= XMLComponentValueList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      aliasFor(ProductionType.XMLSetValue, parserFor.XMLComponentValueList)
    )
);
