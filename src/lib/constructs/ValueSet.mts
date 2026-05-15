import type ElementSetSpecs from './ElementSetSpecs.mjs';

/**
 * A set of ASN.1 values of uniform type.
 * 
 * ```bnf
 * ValueSet ::= "{" ElementSetSpecs "}"
 * ```
 */
export type ValueSet = ElementSetSpecs<string>;
