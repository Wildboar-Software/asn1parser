import {
  whitespace,
  sequenceOf,
  whitespaceDelimitedList,
  optional,
} from './generic/index.js';
import * as parserFor from './specific/index.js';
import ProductionType from '../ProductionType.js';

/**
 * @summary Parse an ASN.1 file, which may contain multiple ASN.1 modules.
 * @description
 * This is a parser for entire files, which may contain, at the root,
 * comments, whitespace, and `ModuleDefinition`s.
 * @constant
 */
export default sequenceOf(ProductionType.document, [
  optional(whitespace),
  whitespaceDelimitedList(ProductionType.modules, parserFor.ModuleDefinition),
]);
