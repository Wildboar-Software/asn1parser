import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SymbolList ::= Symbol | SymbolList "," Symbol`
 */
export const SymbolList: Parser = recursiveParser(
  (): Parser => commaDelimitedList(ProductionType.SymbolList, parserFor.Symbol)
);
export default SymbolList;
