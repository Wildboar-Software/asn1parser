import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import { aliasFor, literal, recursiveParser } from '../generic/index.js';

/**
 * Defined in ITU X.680-2015, Section 12.16.
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.simplestring, literal(ProductionType.cstring))
);
