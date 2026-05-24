import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `AdditionalEnumeration ::= Enumeration`
 */
export const AdditionalEnumeration: Parser = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.AdditionalEnumeration, parserFor.Enumeration)
);
export default AdditionalEnumeration;
