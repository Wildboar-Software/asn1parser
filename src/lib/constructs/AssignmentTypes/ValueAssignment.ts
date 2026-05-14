import { type CommonAssignment } from '../Assignment.js';
import AssignmentType from '../AssignmentType.js';
import { type Type } from '../Type.js';
import { type Value } from '../Value.js';

// ValueAssignment ::=
//     valuereference Type "::=" Value

export default interface ValueAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ValueAssignment
    | AssignmentType.ParameterizedValueAssignment;
  type: Type;
  value: Value;
}
