import { aliasFor, optional, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLSequenceValue ::= XMLComponentValueList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      aliasFor(ProductionType.XMLSequenceValue, parserFor.XMLComponentValueList)
    )
);
