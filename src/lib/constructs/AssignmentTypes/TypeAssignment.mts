import { type CommonAssignment } from '../Assignment.mjs';
import AssignmentType from '../AssignmentType.mjs';
import type Defined from '../Defined.mjs';
import { type Type } from '../Type.mjs';

export default interface TypeAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.TypeAssignment
    | AssignmentType.ParameterizedTypeAssignment;
  type: Type;
  unnestedFrom?: Defined;
}
