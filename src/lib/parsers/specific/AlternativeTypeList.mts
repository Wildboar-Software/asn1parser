import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `AlternativeTypeList ::= NamedType | AlternativeTypeList "," NamedType`
 */
export const AlternativeTypeList: Parser = recursiveParser(
  (): Parser =>
    commaDelimitedList(ProductionType.AlternativeTypeList, parserFor.NamedType)
);
export default AlternativeTypeList;
