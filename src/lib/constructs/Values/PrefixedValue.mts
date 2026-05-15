import { type Value } from '../Value.mjs';

/**
 * An ASN.1 value that is prefixed by tagging or encoding information.
 * 
 * ```bnf
 * PrefixedValue ::= Value
 * ```
 */
export type PrefixedValue = Value;
