import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLNumberForm ::= number`
 */
export const XMLNumberForm: Parser = recursiveParser(
  (): Parser => literal(ProductionType.number, ProductionType.XMLNumberForm)
);
export default XMLNumberForm;
