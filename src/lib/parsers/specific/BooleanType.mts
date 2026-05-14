import literal from '../generic/literal.js';
import recursiveParser from '../generic/recursiveParser.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `BooleanType ::= BOOLEAN`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._BOOLEAN, ProductionType.BooleanType)
);
