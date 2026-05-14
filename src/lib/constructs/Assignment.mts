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
