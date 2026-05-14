import { aliasFor, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `FirstRelativeArcIdentifier ::= ArcIdentifier`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.FirstRelativeArcIdentifier, parserFor.ArcIdentifier)
);
