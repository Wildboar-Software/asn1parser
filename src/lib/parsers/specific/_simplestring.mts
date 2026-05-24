import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { aliasFor, literal, recursiveParser } from '../generic/index.mjs';

/**
 * Defined in ITU X.680-2015, Section 12.16.
 */
export const simplestring: Parser = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.simplestring, literal(ProductionType.cstring))
);
export default simplestring;
