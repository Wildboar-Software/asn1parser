import { type CommonAssignment } from '../Assignment.mjs';
import AssignmentType from '../AssignmentType.mjs';
import { type ObjectClass } from './ObjectClassAssignment/ObjectClass.mjs';

/**
 * An object class assignment.
 * 
 * ```bnf
 * ObjectClassAssignment ::= objectclassreference "::=" ObjectClass
 * 
 * ObjectClass ::=
 *     DefinedObjectClass
 *     | ObjectClassDefn
 *     | ParameterizedObjectClass
 * ```
 */
export default interface ObjectClassAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ObjectClassAssignment
    | AssignmentType.ParameterizedObjectClassAssignment;
  objectClass: ObjectClass;
}
