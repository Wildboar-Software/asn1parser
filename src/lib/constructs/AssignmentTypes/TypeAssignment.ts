import { type CommonAssignment } from '../Assignment.js';
import AssignmentType from '../AssignmentType.js';
import type Defined from '../Defined.js';
import { type Type } from '../Type.js';

export default interface TypeAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.TypeAssignment
    | AssignmentType.ParameterizedTypeAssignment;
  type: Type;
  unnestedFrom?: Defined;
}
