import { type CommonFieldSpec } from '../FieldSpec.mjs';
import type Defined from '../Defined.mjs';
import { type Object_ } from '../AssignmentTypes/ObjectAssignment/Object.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

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
