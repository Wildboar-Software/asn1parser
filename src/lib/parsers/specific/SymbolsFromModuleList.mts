import { recursiveParser, whitespaceDelimitedList } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SymbolsFromModuleList ::= SymbolsFromModule | SymbolsFromModuleList SymbolsFromModule`
 */
export const SymbolsFromModuleList: Parser = recursiveParser(
  (): Parser =>
    whitespaceDelimitedList(
      ProductionType.SymbolsFromModuleList,
      parserFor.SymbolsFromModule
    )
);
export default SymbolsFromModuleList;
