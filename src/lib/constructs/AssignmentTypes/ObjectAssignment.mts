import { type CommonAssignment } from '../Assignment.mjs';
import AssignmentType from '../AssignmentType.mjs';
import { type Object_ } from './ObjectAssignment/Object.mjs';
import type Defined from '../Defined.mjs';
import type { DefaultSyntax } from './ObjectAssignment/ObjectDefn/DefaultSyntax.mjs';

/**
 * An object assignment.
 * 
 * ```bnf
 * ObjectAssignment ::= objectreference DefinedObjectClass "::=" Object
 * ```
 */
export default interface ObjectAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ObjectAssignment
    | AssignmentType.ParameterizedObjectAssignment;

  /**
   * A reference to the ASN.1 information object class
   */
  definedObjectClass: Defined;

  /**
   * The ASN.1 information object.
   */
  object: Object_;

  /**
   * If this object was un-nested from another assignment, this is the
   * reference to that assignment.
   */
  unnestedFrom?: Defined;

  /**
   * The default syntax equivalent of this assignment, if it is translated from
   * the defined syntax.
   */
  defaultSyntax?: DefaultSyntax;
}
