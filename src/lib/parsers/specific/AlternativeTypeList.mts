import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `AlternativeTypeList ::= NamedType | AlternativeTypeList "," NamedType`
 */
export default recursiveParser(
  (): Parser =>
    commaDelimitedList(ProductionType.AlternativeTypeList, parserFor.NamedType)
);
