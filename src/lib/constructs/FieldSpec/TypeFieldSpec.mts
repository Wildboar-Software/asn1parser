import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type Type } from '../Type.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

// TypeFieldSpec ::=
//     typefieldreference TypeOptionalitySpec?

// TypeOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT Type

export default interface TypeFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.TypeFieldSpec;
  default?: Type;
}
