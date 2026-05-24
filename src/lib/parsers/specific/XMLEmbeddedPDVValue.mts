import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLEmbeddedPDVValue ::= XMLSequenceValue`
 */
export const XMLEmbeddedPDVValue: Parser = recursiveParser(
  (): Parser =>
    literal(ProductionType.XMLSequenceValue, ProductionType.XMLEmbeddedPDVValue)
);
export default XMLEmbeddedPDVValue;
