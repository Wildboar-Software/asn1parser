import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RelativeOIDType ::= RELATIVE-OID`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType._RELATIVE_OID, ProductionType.RelativeOIDType)
);
