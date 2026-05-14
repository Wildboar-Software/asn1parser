import { recursiveParser, aliasFor } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLExternalValue ::= XMLSequenceValue`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.XMLExternalValue, parserFor.XMLSequenceValue)
);
