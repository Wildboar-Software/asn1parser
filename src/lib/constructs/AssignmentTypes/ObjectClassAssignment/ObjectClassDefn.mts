import { type FieldSpec } from '../../FieldSpec/index.js';
import { type TokenOrGroupSpec } from '../../TokenOrGroupSpec.js';
import type GrokedThing from '../../../interfaces/GrokedThing.js';

// ObjectClassDefn ::=
//     CLASS "{" FieldSpec "," + "}" WithSyntaxSpec?

export default interface ObjectClassDefn extends GrokedThing {
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
