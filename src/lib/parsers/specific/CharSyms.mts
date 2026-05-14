import { commaDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `CharSyms ::= CharsDefn | CharSyms "," CharsDefn`
 */
export default recursiveParser(
  (): Parser => commaDelimitedList(ProductionType.CharSyms, parserFor.CharsDefn)
);
