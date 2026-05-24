import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Enumeration ::= EnumerationItem | EnumerationItem "," Enumeration`
 */
export const Enumeration: Parser = recursiveParser(
  (): Parser =>
    commaDelimitedList(ProductionType.Enumeration, parserFor.EnumerationItem)
);
export default Enumeration;
