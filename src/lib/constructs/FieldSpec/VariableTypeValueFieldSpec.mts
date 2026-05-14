import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type FieldName } from '../FieldName.mjs';
import { type Value } from '../Value.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

// VariableTypeValueFieldSpec ::=
//     valuefieldreference FieldName ValueOptionalitySpec ?

export default interface VariableTypeValueFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.VariableTypeValueFieldSpec;
  fieldName: FieldName;
  default?: Value;
}
