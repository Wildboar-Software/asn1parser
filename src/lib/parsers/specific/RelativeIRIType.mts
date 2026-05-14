import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `RelativeIRIType ::= RELATIVE-OID-IRI`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType._RELATIVE_OID_IRI, ProductionType.RelativeIRIType)
);
