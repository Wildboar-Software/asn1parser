// `SyntaxList ::= "{" TokenOrGroupSpec empty + "}"`
/**
 * A token literal or group of optional tokens that together
 * constitute the defined syntax for an ASN.1 information
 * object class.
 * 
 * ```bnf
 * TokenOrGroupSpec ::= RequiredToken | OptionalGroup
 * ```
 */
export type TokenOrGroupSpec = string | TokenOrGroupSpec[];
