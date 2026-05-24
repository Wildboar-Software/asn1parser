import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { literal, recursiveParser } from '../generic/index.mjs';

/**
 * `DefinitiveNumberForm ::= number`
 */
export const DefinitiveNumberForm: Parser = recursiveParser(
  (): Parser =>
    literal(ProductionType.number, ProductionType.DefinitiveNumberForm)
);
export default DefinitiveNumberForm;
