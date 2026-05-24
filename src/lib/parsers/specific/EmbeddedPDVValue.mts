import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EmbeddedPDVValue ::= SequenceValue`
 */
export const EmbeddedPDVValue: Parser = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.EmbeddedPDVValue, parserFor.SequenceValue)
);
export default EmbeddedPDVValue;
