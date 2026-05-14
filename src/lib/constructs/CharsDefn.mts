import type Defined from './Defined.mjs';
import type Quadruple from  './Quadruple.mjs';
import type Tuple from  './Tuple.mjs';

/**
 * `CharsDefn ::= cstring | Quadruple | Tuple | DefinedValue`
 */
export type CharsDefn = string | Quadruple | Tuple | Defined;
