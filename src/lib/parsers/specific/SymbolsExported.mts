import { optional, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import SymbolList from './SymbolList.mjs';

/**
 * `SymbolsExported ::= SymbolList | empty`
 */
export default recursiveParser((): Parser => optional(SymbolList));
