import { commaDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `NamedNumberList ::= NamedNumber | NamedNumberList "," NamedNumber`
 */
export default recursiveParser(
  (): Parser =>
    commaDelimitedList(ProductionType.NamedNumberList, parserFor.NamedNumber)
);
