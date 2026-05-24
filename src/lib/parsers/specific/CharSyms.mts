import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `CharSyms ::= CharsDefn | CharSyms "," CharsDefn`
 */
export const CharSyms: Parser = recursiveParser(
  (): Parser => commaDelimitedList(ProductionType.CharSyms, parserFor.CharsDefn)
);
export default CharSyms;
