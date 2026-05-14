import { optional, recursiveParser, aliasFor } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `SymbolsImported ::= SymbolsFromModuleList | empty`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(
      ProductionType.SymbolsImported,
      optional(parserFor.SymbolsFromModuleList)
    )
);
