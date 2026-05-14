import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RelativeIRIType ::= RELATIVE-OID-IRI`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType._RELATIVE_OID_IRI, ProductionType.RelativeIRIType)
);
