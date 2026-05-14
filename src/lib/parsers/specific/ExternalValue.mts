import { aliasFor, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExternalValue ::= SequenceValue`
 */
export default recursiveParser(
  (): Parser => aliasFor(ProductionType.ExternalValue, parserFor.SequenceValue)
);
