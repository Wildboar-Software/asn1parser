import { aliasFor, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `DummyGovernor ::= DummyReference`
 */
export default recursiveParser(
  (): Parser => aliasFor(ProductionType.DummyGovernor, parserFor.DummyReference)
);
