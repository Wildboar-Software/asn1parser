import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { literal, recursiveParser } from '../generic/index.mjs';

/**
 * `NameForm ::= identifier`
 */
export const NameForm: Parser = recursiveParser(
  (): Parser => literal(ProductionType.identifier, ProductionType.NameForm)
);
export default NameForm;
