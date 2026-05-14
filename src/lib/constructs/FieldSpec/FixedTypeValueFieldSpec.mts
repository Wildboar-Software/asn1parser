import { type CommonFieldSpec } from '../FieldSpec.js';
import { type Type } from '../Type.js';
import { type Value } from '../Value.js';
import FieldSpecType from '../FieldSpecType.js';

// TypeFixedTypeValueFieldSpec ::=
//     valuefieldreference Type UNIQUE? ValueOptionalitySpec ?

export default interface FixedTypeValueFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.FixedTypeValueFieldSpec;
  type: Type;
  unique: boolean;
  default?: Value;
}
