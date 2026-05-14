import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `IRIType ::= OID-IRI`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._OID_IRI, ProductionType.IRIType)
);
