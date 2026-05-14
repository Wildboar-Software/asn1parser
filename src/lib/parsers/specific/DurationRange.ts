import { aliasFor, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `DurationRange ::= ValueRange`
 */
export default recursiveParser(
  (): Parser => aliasFor(ProductionType.DurationRange, parserFor.ValueRange)
);
