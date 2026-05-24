import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SingleValue ::= Value`
 */
export const SingleValue: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.SingleValue, parserFor.Value)
);
export default SingleValue;
