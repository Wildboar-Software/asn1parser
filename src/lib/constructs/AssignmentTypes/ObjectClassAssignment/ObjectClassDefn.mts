import { type FieldSpec } from '../../FieldSpec/index.mjs';
import { type TokenOrGroupSpec } from '../../TokenOrGroupSpec.mjs';
import type GrokedThing from '../../../interfaces/GrokedThing.mjs';

// ObjectClassDefn ::=
//     CLASS "{" FieldSpec "," + "}" WithSyntaxSpec?

/**
 * An information object class definition, which is a group of fields that
 * have associated ASN.1 productions and, optionally, a specially-defined
 * syntax for defining objects of this class.
 * 
 * ```bnf
 * ObjectClassDefn ::= CLASS "{" FieldSpec "," + "}" WithSyntaxSpec?
 * ```
 */
export default interface ObjectClassDefn extends GrokedThing {
  /**
   * A map of field references to their field specifications.
   */
  fieldSpecs: {
    [reference: string]: FieldSpec;
  };

  /**
   * It is probably best that this is left as a string. It can be used like
   * a regular-expression: a domain-specific micro-language specifically for
   * validating and setting DefinedSyntax occurrences.
   *
   * It would be difficult to break this into a data-structure, and probably
   * just as useful to leave it as a string.
   */
  syntax?: TokenOrGroupSpec[];
}
