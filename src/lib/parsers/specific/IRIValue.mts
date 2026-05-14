import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import literal from '../generic/literal.mjs';
import recursiveParser from '../generic/recursiveParser.mjs';
import { aliasFor } from '../generic/index.mjs';

/**
 * `IRIValue ::= """ FirstArcIdentifier SubsequentArcIdentifier """`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.IRIValue, literal(ProductionType.cstring))
);
