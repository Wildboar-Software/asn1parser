import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TypeConstraint ::= Type`
 */
export const TypeConstraint: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.TypeConstraint, parserFor.Type)
);
export default TypeConstraint;
