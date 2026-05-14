import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import { literal, recursiveParser } from '../generic/index.js';

/**
 * `NameForm ::= identifier`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType.identifier, ProductionType.NameForm)
);
