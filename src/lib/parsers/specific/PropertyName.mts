import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `PropertyName ::= psname`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.psname, ProductionType.PropertyName)
);
