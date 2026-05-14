import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import { literal, recursiveParser } from '../generic/index.js';

/**
 * `DefinitiveNumberForm ::= number`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType.number, ProductionType.DefinitiveNumberForm)
);
