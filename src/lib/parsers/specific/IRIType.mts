import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `IRIType ::= OID-IRI`
 */
export const IRIType: Parser = recursiveParser(
  (): Parser => literal(ProductionType._OID_IRI, ProductionType.IRIType)
);
export default IRIType;
