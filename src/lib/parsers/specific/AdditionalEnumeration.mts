import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `AdditionalEnumeration ::= Enumeration`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.AdditionalEnumeration, parserFor.Enumeration)
);
