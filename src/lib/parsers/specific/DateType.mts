import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DateType ::= DATE`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._DATE, ProductionType.DateType)
);
