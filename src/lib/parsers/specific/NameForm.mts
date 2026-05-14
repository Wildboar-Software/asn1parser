import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { literal, recursiveParser } from '../generic/index.mjs';

/**
 * `NameForm ::= identifier`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.identifier, ProductionType.NameForm)
);
