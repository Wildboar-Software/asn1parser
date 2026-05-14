import { aliasFor, optional, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLSequenceValue ::= XMLComponentValueList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      aliasFor(ProductionType.XMLSequenceValue, parserFor.XMLComponentValueList)
    )
);
