import type GrokedThing from '../../interfaces/GrokedThing.mjs';

/**
 * An ASN.1 `ANY` type, which can be any type. This type is deprecated, but
 * many specifications just use hacks to get around it, such as using
 * `TYPE-IDENTIFIER.&Type` to mean `ANY`.
 * 
 * ```bnf
 * AnyType ::= ANY | ANY DEFINED BY identifier
 * ```
 */
export default interface AnyType extends GrokedThing {
  definedBy?: string;
}
