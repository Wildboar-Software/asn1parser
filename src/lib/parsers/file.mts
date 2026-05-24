import {
  whitespace,
  sequenceOf,
  whitespaceDelimitedList,
  optional,
} from './generic/index.mjs';
import * as parserFor from './specific/index.mjs';
import ProductionType from '../ProductionType.mjs';
import type Parser from '../Parser.mjs';

/**
 * @summary Parse an ASN.1 file, which may contain multiple ASN.1 modules.
 * @description
 * This is a parser for entire files, which may contain, at the root,
 * comments, whitespace, and `ModuleDefinition`s.
 * @constant
 */
export const file: Parser = sequenceOf(ProductionType.document, [
  optional(whitespace),
  whitespaceDelimitedList(ProductionType.modules, parserFor.ModuleDefinition),
]);
export default file;
