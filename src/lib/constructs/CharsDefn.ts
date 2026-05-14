import type Defined from './Defined.js';
import type Quadruple from  './Quadruple.js';
import type Tuple from  './Tuple.js';

/**
 * `CharsDefn ::= cstring | Quadruple | Tuple | DefinedValue`
 */
export type CharsDefn = string | Quadruple | Tuple | Defined;
