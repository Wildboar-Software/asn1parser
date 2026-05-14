import { type CommonFieldSpec } from '../FieldSpec.js';
import type Defined from '../Defined.js';
import { type ObjectSet } from '../ObjectSet.js';
import FieldSpecType from '../FieldSpecType.js';

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
