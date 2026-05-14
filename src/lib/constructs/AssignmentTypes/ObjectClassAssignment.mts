import { type CommonAssignment } from '../Assignment.js';
import AssignmentType from '../AssignmentType.js';
import { type ObjectClass } from './ObjectClassAssignment/ObjectClass.js';

// ObjectClassAssignment ::=
//     objectclassreference "::=" ObjectClass

// ObjectClass ::=
//     DefinedObjectClass
//     | ObjectClassDefn
//     | ParameterizedObjectClass

export default interface ObjectClassAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ObjectClassAssignment
    | AssignmentType.ParameterizedObjectClassAssignment;
  objectClass: ObjectClass;
}
