import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type Type } from '../Type.mjs';
import { type ValueSet } from '../ValueSet.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

// FixedTypeValueSetFieldSpec ::=
//     valuesetfieldreference Type ValueSetOptionalitySpec ?

// ValueSetOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT ValueSet

export default interface FixedTypeValueSetFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.FixedTypeValueSetFieldSpec;
  type: Type;
  default?: ValueSet;
}
