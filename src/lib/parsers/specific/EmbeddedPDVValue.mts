import { aliasFor, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EmbeddedPDVValue ::= SequenceValue`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.EmbeddedPDVValue, parserFor.SequenceValue)
);
