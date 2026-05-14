import type Defined from './Defined.mjs';
import { type Type } from './Type.mjs';
import { type Value } from './Value.mjs';

/**
 * `ExceptionIdentification ::=
 *      SignedNumber
 *      | DefinedValue
 *      | Type ":" Value`
 */
export type ExceptionIdentification = number | Defined | [Type, Value];
