import { type CommonAssignment } from '../Assignment.js';
import AssignmentType from '../AssignmentType.js';
import { type Object_ } from './ObjectAssignment/Object.js';
import type Defined from '../Defined.js';

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
