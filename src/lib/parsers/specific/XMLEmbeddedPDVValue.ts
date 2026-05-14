import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLEmbeddedPDVValue ::= XMLSequenceValue`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType.XMLSequenceValue, ProductionType.XMLEmbeddedPDVValue)
);
