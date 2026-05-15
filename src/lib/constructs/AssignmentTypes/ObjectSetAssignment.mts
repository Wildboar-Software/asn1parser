import { type CommonAssignment } from '../Assignment.mjs';
import AssignmentType from '../AssignmentType.mjs';
import type Defined from '../Defined.mjs';
import { type ObjectSet } from '../ObjectSet.mjs';

/**
 * An object set assignment.
 * 
 * ```bnf
 * ObjectSetAssignment ::= objectsetreference DefinedObjectClass "::=" ObjectSet
 * ```
 */
export default interface ObjectSetAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ObjectSetAssignment
    | AssignmentType.ParameterizedObjectSetAssignment;
  definedObjectClass: Defined;
  objectSetSpec: ObjectSet;
}
