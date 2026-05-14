import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `IRIType ::= OID-IRI`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._OID_IRI, ProductionType.IRIType)
);
