import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLEmbeddedPDVValue ::= XMLSequenceValue`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType.XMLSequenceValue, ProductionType.XMLEmbeddedPDVValue)
);
