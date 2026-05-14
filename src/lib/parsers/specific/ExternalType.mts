import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExternalType ::= EXTERNAL`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._EXTERNAL, ProductionType.ExternalType)
);
