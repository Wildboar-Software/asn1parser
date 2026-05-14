import { aliasFor, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TypeConstraint ::= Type`
 */
export default recursiveParser(
  (): Parser => aliasFor(ProductionType.TypeConstraint, parserFor.Type)
);
