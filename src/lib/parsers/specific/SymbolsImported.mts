import { optional, recursiveParser, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SymbolsImported ::= SymbolsFromModuleList | empty`
 */
export const SymbolsImported: Parser = recursiveParser(
  (): Parser =>
    aliasFor(
      ProductionType.SymbolsImported,
      optional(parserFor.SymbolsFromModuleList)
    )
);
export default SymbolsImported;
