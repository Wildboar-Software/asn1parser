import { optional, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import SymbolList from './SymbolList.mjs';

/**
 * `SymbolsExported ::= SymbolList | empty`
 */
export const SymbolsExported: Parser = recursiveParser((): Parser => optional(SymbolList));
export default SymbolsExported;
