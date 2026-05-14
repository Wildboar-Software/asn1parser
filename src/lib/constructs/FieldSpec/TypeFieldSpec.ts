import { type CommonFieldSpec } from '../FieldSpec.js';
import { type Type } from '../Type.js';
import FieldSpecType from '../FieldSpecType.js';

// TypeFieldSpec ::=
//     typefieldreference TypeOptionalitySpec?

// TypeOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT Type

export default interface TypeFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.TypeFieldSpec;
  default?: Type;
}
