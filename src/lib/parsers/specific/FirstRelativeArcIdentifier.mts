import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `FirstRelativeArcIdentifier ::= ArcIdentifier`
 */
export const FirstRelativeArcIdentifier: Parser = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.FirstRelativeArcIdentifier, parserFor.ArcIdentifier)
);
export default FirstRelativeArcIdentifier;
