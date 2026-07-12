import AssignmentType from './AssignmentType.mjs';
import type Defined from './Defined.mjs';
import type Parameter from './Parameter.mjs';
import type ObjectAssignment from './AssignmentTypes/ObjectAssignment.mjs';
import type ObjectClassAssignment from './AssignmentTypes/ObjectClassAssignment.mjs';
import type ObjectSetAssignment from './AssignmentTypes/ObjectSetAssignment.mjs';
import type TypeAssignment from './AssignmentTypes/TypeAssignment.mjs';
import type ValueAssignment from './AssignmentTypes/ValueAssignment.mjs';
import type ValueSetTypeAssignment from './AssignmentTypes/ValueSetTypeAssignment.mjs';
import type GrokedThing from '../interfaces/GrokedThing.mjs';

export interface CommonAssignment extends GrokedThing {
  /**
   * The identifier established by this assignment
   */
  identifier: string;
  /**
   * The type of this assignment
   */
  assignmentType: AssignmentType;
  /**
   * The left-hand side of the assignment operator
   */
  leftHandSide: string;
  /**
   * The right-hand side of the assignment operator
   */
  rightHandSide: string;
  /**
   * Information pertaining to the assignment module.
   * 
   * I think this is hardly used anywhere.
   */
  module?: {
    /**
     * The name of the assigning module
     */
    name: string;
  };
  /**
   * A map of the fully-qualified reference as a string to the a structured
   * fully-qualified reference. Each key / value in this object is an
   * assignment that must be understood for this assignment to be fully
   * understood.
   */
  dependencies: Record<string, Defined>; // string = `${d.module || d.computedModule}.${d.reference}`

  // TODO: This is unused at the moment
  /**
   * Index in the ASN.1 module in which this assignment appears. If this is set
   * to zero, it means this is the first assignment at the top of the ASN.1
   * module.
   */
  originalIndex?: number;
  /**
   * The zero-based order in which this assignment should appear in the final
   * compiled code if the targeted programming language has a define-before-use
   * rule.
   */
  dependencyIndex?: number;
  /**
   * Parameters, if this is a parameterized assignment
   */
  parameters?: Parameter[];
}

interface OtherAssignment extends CommonAssignment {
  assignmentType: AssignmentType.XMLValueAssignment;
}

export type Assignment =
  | ObjectAssignment
  | ObjectClassAssignment
  | ObjectSetAssignment
  | TypeAssignment
  | ValueAssignment
  | ValueSetTypeAssignment
  | OtherAssignment; // This is just to AssignmentType.XMLValueAssignment works.
