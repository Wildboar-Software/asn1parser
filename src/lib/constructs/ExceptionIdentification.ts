import type Defined from './Defined.js';
import { type Type } from './Type.js';
import { type Value } from './Value.js';

/**
 * `ExceptionIdentification ::=
 *      SignedNumber
 *      | DefinedValue
 *      | Type ":" Value`
 */
export type ExceptionIdentification = number | Defined | [Type, Value];
