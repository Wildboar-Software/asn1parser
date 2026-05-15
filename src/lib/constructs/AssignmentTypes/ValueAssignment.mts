import { type CommonAssignment } from '../Assignment.mjs';
import AssignmentType from '../AssignmentType.mjs';
import { type Type } from '../Type.mjs';
import { type Value } from '../Value.mjs';

/**
 * A value assignment.
 * 
 * ```bnf
 * ValueAssignment ::= valuereference Type "::=" Value
 * ```
 */
export default interface ValueAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ValueAssignment
    | AssignmentType.ParameterizedValueAssignment;
  type: Type;
  value: Value;
}
