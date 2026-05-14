import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `RelativeOIDType ::= RELATIVE-OID`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType._RELATIVE_OID, ProductionType.RelativeOIDType)
);
