import { commaDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ComponentValueList ::= NamedValue | ComponentValueList "," NamedValue`
 */
export default recursiveParser(
  (): Parser =>
    commaDelimitedList(ProductionType.ComponentValueList, parserFor.NamedValue)
);
