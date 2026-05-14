import { type CommonFieldSpec } from '../FieldSpec.js';
import { type FieldName } from '../FieldName.js';
import { type Value } from '../Value.js';
import FieldSpecType from '../FieldSpecType.js';

// VariableTypeValueFieldSpec ::=
//     valuefieldreference FieldName ValueOptionalitySpec ?

export default interface VariableTypeValueFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.VariableTypeValueFieldSpec;
  fieldName: FieldName;
  default?: Value;
}
