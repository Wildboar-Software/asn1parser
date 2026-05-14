import { recursiveParser, whitespaceDelimitedList } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `SymbolsFromModuleList ::= SymbolsFromModule | SymbolsFromModuleList SymbolsFromModule`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceDelimitedList(
      ProductionType.SymbolsFromModuleList,
      parserFor.SymbolsFromModule
    )
);
