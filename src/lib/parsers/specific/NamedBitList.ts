import { commaDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `NamedBitList ::= NamedBit | NamedBitList "," NamedBit`
 */
export default recursiveParser(
  (): Parser =>
    commaDelimitedList(ProductionType.NamedBitList, parserFor.NamedBit)
);
