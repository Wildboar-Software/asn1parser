import type ObjectSetSpec from './ObjectSetSpec.mjs';

/**
 * A set of ASN.1 information objects.
 * 
 * ```bnf
 * ObjectSet ::= "{" ObjectSetSpec "}"
 * ```
 */
export type ObjectSet = ObjectSetSpec;
