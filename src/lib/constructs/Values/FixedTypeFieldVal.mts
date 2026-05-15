import { type Value } from '../Value.mjs';

/**
 * An ASN.1 value corresponding to a type taken from a field from an
 * information object that has a fixed type.
 * 
 * ```bnf
 * FixedTypeFieldVal ::= BuiltinValue | ReferencedValue
 * ```
 */
export type FixedTypeFieldVal = Value;
