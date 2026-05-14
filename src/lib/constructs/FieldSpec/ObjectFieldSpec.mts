import { type CommonFieldSpec } from '../FieldSpec.js';
import type Defined from '../Defined.js';
import { type Object_ } from '../AssignmentTypes/ObjectAssignment/Object.js';
import FieldSpecType from '../FieldSpecType.js';

// ObjectFieldSpec ::=
//     objectfieldreference DefinedObjectClass ObjectOptionalitySpec?

// ObjectOptionalitySpec ::=
//     OPTIONAL
//     | DEFAULT Object

export default interface ObjectFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.ObjectFieldSpec;
  definedObjectClass: Defined;
  default?: Object_;
}
