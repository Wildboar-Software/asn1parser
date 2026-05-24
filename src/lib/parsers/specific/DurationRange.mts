import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DurationRange ::= ValueRange`
 */
export const DurationRange: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.DurationRange, parserFor.ValueRange)
);
export default DurationRange;
