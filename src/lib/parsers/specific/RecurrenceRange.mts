import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RecurrenceRange ::= ValueRange`
 */
export const RecurrenceRange: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.RecurrenceRange, parserFor.ValueRange)
);
export default RecurrenceRange;
