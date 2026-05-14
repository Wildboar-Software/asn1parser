import { type CommonAssignment } from '../Assignment.js';
import AssignmentType from '../AssignmentType.js';
import { type Type } from '../Type.js';
import { type ValueSetType } from '../ValueSetType.js';

// ValueSetTypeAssignment ::=
//     typereference Type "::=" ValueSet

// ValueSet ::=
// 	"{" ElementSetSpecs "}"

export default interface ValueSetTypeAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ValueSetTypeAssignment
    | AssignmentType.ParameterizedValueSetTypeAssignment;
  type: Type;
  valueSet: ValueSetType;
}
