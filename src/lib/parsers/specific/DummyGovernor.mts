import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DummyGovernor ::= DummyReference`
 */
export const DummyGovernor: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.DummyGovernor, parserFor.DummyReference)
);
export default DummyGovernor;
