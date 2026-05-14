import { type CommonFieldSpec } from '../FieldSpec.js';
import { type FieldName } from '../FieldName.js';
import { type ValueSet } from '../ValueSet.js';
import FieldSpecType from '../FieldSpecType.js';

// VariableTypeValueSetFieldSpec ::=
//     valuesetfieldreference FieldName ValueSetOptionalitySpec?

export default interface VariableTypeValueSetFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.VariableTypeValueSetFieldSpec;
  fieldName: FieldName;
  default?: ValueSet;
}
