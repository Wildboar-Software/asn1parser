import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { literal, recursiveParser } from '../generic/index.mjs';

/**
 * `DefinitiveNumberForm ::= number`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType.number, ProductionType.DefinitiveNumberForm)
);
