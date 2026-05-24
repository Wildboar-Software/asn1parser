import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ComponentValueList ::= NamedValue | ComponentValueList "," NamedValue`
 */
export const ComponentValueList: Parser = recursiveParser(
  (): Parser =>
    commaDelimitedList(ProductionType.ComponentValueList, parserFor.NamedValue)
);
export default ComponentValueList;
