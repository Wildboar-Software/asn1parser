import { type CommonAssignment } from '../Assignment.mjs';
import AssignmentType from '../AssignmentType.mjs';
import { type Object_ } from './ObjectAssignment/Object.mjs';
import type Defined from '../Defined.mjs';

// ObjectAssignment ::=
//     objectreference DefinedObjectClass "::=" Object

export default interface ObjectAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ObjectAssignment
    | AssignmentType.ParameterizedObjectAssignment;
  definedObjectClass: Defined;
  object: Object_;
  unnestedFrom?: Defined;
}
