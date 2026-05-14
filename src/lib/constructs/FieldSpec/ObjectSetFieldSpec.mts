import { type CommonFieldSpec } from '../FieldSpec.mjs';
import type Defined from '../Defined.mjs';
import { type ObjectSet } from '../ObjectSet.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

// ObjectSetFieldSpec ::=
//     objectsetfieldreference DefinedObjectClass ObjectSetOptionalitySpec ?

// ObjectSetOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT ObjectSet

export default interface ObjectSetFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.ObjectSetFieldSpec;
  definedObjectClass: Defined;
  default?: ObjectSet;
}
