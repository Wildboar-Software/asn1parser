import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RelativeIRIType ::= RELATIVE-OID-IRI`
 */
export const RelativeIRIType: Parser = recursiveParser(
  (): Parser =>
    literal(ProductionType._RELATIVE_OID_IRI, ProductionType.RelativeIRIType)
);
export default RelativeIRIType;
