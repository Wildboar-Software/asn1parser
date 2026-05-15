import { type CommonFieldSpec } from '../FieldSpec.mjs';
import type Defined from '../Defined.mjs';
import { type Object_ } from '../AssignmentTypes/ObjectAssignment/Object.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

/**
 * A field of an information object class that itself is an object.
 *
 * ```bnf
 * ObjectFieldSpec ::= objectfieldreference DefinedObjectClass ObjectOptionalitySpec?
 * ObjectOptionalitySpec ::= OPTIONAL | DEFAULT Object
 * ```
 */
export default interface ObjectFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.ObjectFieldSpec;

  /**
   * A reference to the information object class of which this field's
   * information object must be an instance.
   */
  definedObjectClass: Defined;

  /**
   * The default value for this field.
   */
  default?: Object_;
}
