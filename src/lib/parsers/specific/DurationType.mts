import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DurationType ::= DURATION`
 */
export const DurationType: Parser = recursiveParser(
  (): Parser => literal(ProductionType._DURATION, ProductionType.DurationType)
);
export default DurationType;
