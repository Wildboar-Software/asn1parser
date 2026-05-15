import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type FieldName } from '../FieldName.mjs';
import { type Value } from '../Value.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

/**
 * A field of an information object class that has value of a variable type.
 *
 * ```bnf
 * VariableTypeValueFieldSpec ::= valuefieldreference FieldName ValueOptionalitySpec ?
 * ```
 */
export default interface VariableTypeValueFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.VariableTypeValueFieldSpec;

  /**
   * The name of the field within this object (or transitively in other objects
   * if this contains more than one field name) from which the type of this
   * value is to be taken.
   */
  fieldName: FieldName;

  /**
   * The default value for this field.
   */
  default?: Value;
}
