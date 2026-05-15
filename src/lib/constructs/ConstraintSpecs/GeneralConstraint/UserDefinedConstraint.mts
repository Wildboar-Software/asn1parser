import type GrokedThing from '../../../interfaces/GrokedThing.mjs';

/**
 * A constraint that imposes an arbitrary constraint on a more general type
 * based on the human-readable textual content of a comment, along with zero
 * or more ASN.1 productions.
 *
 * ```bnf
 * UserDefinedConstraint ::= CONSTRAINED BY "{" UserDefinedConstraintParameter "," * "}"
 * ```
 * 
 * As an example of usage, you can define something like this:
 * 
 * ```asn1
 * EmailAddress ::= UTF8String (CONSTRAINED BY { -- must be a valid email address -- })
 * ```
 */
export default interface UserDefinedConstraint extends GrokedThing {
  /**
   * ASN.1 productions used in imposing the constraint.
   */
  constrainedBy: string[];
}
