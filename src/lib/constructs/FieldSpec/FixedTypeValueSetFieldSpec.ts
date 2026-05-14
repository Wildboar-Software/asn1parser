import { type CommonFieldSpec } from '../FieldSpec.js';
import { type Type } from '../Type.js';
import { type ValueSet } from '../ValueSet.js';
import FieldSpecType from '../FieldSpecType.js';

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
