import { type CommonAssignment } from '../Assignment.mjs';
import AssignmentType from '../AssignmentType.mjs';
import { type Type } from '../Type.mjs';
import { type ValueSetType } from '../ValueSetType.mjs';

/**
 * A value set type assignment.
 * 
 * ```bnf
 * ValueSetTypeAssignment ::= typereference Type "::=" ValueSet
 * ```
 */
export default interface ValueSetTypeAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ValueSetTypeAssignment
    | AssignmentType.ParameterizedValueSetTypeAssignment;
  type: Type;
  valueSet: ValueSetType;
}
