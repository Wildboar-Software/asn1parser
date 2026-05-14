import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `PropertyName ::= psname`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.psname, ProductionType.PropertyName)
);
