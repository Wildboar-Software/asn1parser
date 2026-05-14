import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type FieldName } from '../FieldName.mjs';
import { type ValueSet } from '../ValueSet.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

// VariableTypeValueSetFieldSpec ::=
//     valuesetfieldreference FieldName ValueSetOptionalitySpec?

export default interface VariableTypeValueSetFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.VariableTypeValueSetFieldSpec;
  fieldName: FieldName;
  default?: ValueSet;
}
