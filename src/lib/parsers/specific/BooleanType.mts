import literal from '../generic/literal.mjs';
import recursiveParser from '../generic/recursiveParser.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `BooleanType ::= BOOLEAN`
 */
export default recursiveParser(
  (): Parser => literal(ProductionType._BOOLEAN, ProductionType.BooleanType)
);
