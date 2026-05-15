import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type FieldName } from '../FieldName.mjs';
import { type ValueSet } from '../ValueSet.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

/**
 * A field of an information object class that has value set of a variable type.
 *
 * ```bnf
 * VariableTypeValueSetFieldSpec ::= valuesetfieldreference FieldName ValueSetOptionalitySpec?
 * ```
 */
export default interface VariableTypeValueSetFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.VariableTypeValueSetFieldSpec;

  /**
   * The name of the field within this object (or transitively in other objects
   * if this contains more than one field name) from which the type of this
   * value set is to be taken.
   */
  fieldName: FieldName;

  /**
   * The default value set for this field.
   */
  default?: ValueSet;
}
