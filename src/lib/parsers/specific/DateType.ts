import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `DateType ::= DATE`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._DATE, ProductionType.DateType)
);
