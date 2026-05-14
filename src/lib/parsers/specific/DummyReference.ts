import { aliasFor, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `DummyReference ::= Reference`
 */
export default recursiveParser(
  (): Parser => aliasFor(ProductionType.DummyReference, parserFor.Reference)
);
