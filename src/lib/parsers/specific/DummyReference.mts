import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DummyReference ::= Reference`
 */
export const DummyReference: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.DummyReference, parserFor.Reference)
);
export default DummyReference;
