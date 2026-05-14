import { optional, recursiveParser, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
