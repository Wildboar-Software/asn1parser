import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type Type } from '../Type.mjs';
import { type Value } from '../Value.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

// TypeFixedTypeValueFieldSpec ::=
//     valuefieldreference Type UNIQUE? ValueOptionalitySpec ?

export default interface FixedTypeValueFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.FixedTypeValueFieldSpec;
  type: Type;
  unique: boolean;
  default?: Value;
}
