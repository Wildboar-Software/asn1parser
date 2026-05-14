import AssignmentType from './AssignmentType.js';
import type Defined from './Defined.js';
import type Parameter from './Parameter.js';
import type ObjectAssignment from './AssignmentTypes/ObjectAssignment.js';
import type ObjectClassAssignment from './AssignmentTypes/ObjectClassAssignment.js';
import type ObjectSetAssignment from './AssignmentTypes/ObjectSetAssignment.js';
import type TypeAssignment from './AssignmentTypes/TypeAssignment.js';
import type ValueAssignment from './AssignmentTypes/ValueAssignment.js';
import type ValueSetTypeAssignment from './AssignmentTypes/ValueSetTypeAssignment.js';
import type GrokedThing from '../interfaces/GrokedThing.js';

export interface CommonAssignment extends GrokedThing {
  identifier: string;
  assignmentType: AssignmentType;
  leftHandSide: string;
  rightHandSide: string;
  module?: {
    name: string;
  };
  dependencies: Record<string, Defined>; // string = `${d.module || d.computedModule}.${d.reference}`
  originalIndex?: number;
  dependencyIndex?: number;
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
