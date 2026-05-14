import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import literal from '../generic/literal.js';
import recursiveParser from '../generic/recursiveParser.js';
import { aliasFor } from '../generic/index.js';

/**
 * `IRIValue ::= """ FirstArcIdentifier SubsequentArcIdentifier """`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.IRIValue, literal(ProductionType.cstring))
);
