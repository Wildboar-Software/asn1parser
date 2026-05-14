import { optional, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import SymbolList from './SymbolList.js';

/**
 * `SymbolsExported ::= SymbolList | empty`
 */
export default recursiveParser((): Parser => optional(SymbolList));
