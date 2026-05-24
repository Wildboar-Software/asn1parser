import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `NamedNumberList ::= NamedNumber | NamedNumberList "," NamedNumber`
 */
export const NamedNumberList: Parser = recursiveParser(
  (): Parser =>
    commaDelimitedList(ProductionType.NamedNumberList, parserFor.NamedNumber)
);
export default NamedNumberList;
