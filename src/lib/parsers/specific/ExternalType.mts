import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExternalType ::= EXTERNAL`
 */
export const ExternalType: Parser = recursiveParser(
  (): Parser => literal(ProductionType._EXTERNAL, ProductionType.ExternalType)
);
export default ExternalType;
