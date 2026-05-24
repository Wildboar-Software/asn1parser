import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `NamedValueList ::= NamedValue | NamedValueList "," NamedValue`
 */
export const NamedValueList: Parser = recursiveParser(
  (): Parser =>
    commaDelimitedList(ProductionType.NamedValueList, parserFor.NamedValue)
);
export default NamedValueList;
