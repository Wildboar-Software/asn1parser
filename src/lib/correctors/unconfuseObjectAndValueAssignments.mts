import type Module from '../constructs/Module.js';
import type ValueAssignment from '../constructs/AssignmentTypes/ValueAssignment.js';
import TypeType from '../constructs/TypeType.js';
import type Defined from '../constructs/Defined.js';
import recursivelyResolve from '../recursivelyResolve.js';
import type ObjectAssignment from '../constructs/AssignmentTypes/ObjectAssignment.js';
import AssignmentType from '../constructs/AssignmentType.js';
import { type Assignment } from '../constructs/Assignment.js';
import ValueType from '../constructs/ValueType.js';

// TODO: Handle ObjectFromObject.

/**
 * @summary Determine whether an assignment is really an object assignment
 * @description
 * In certain cases, what is actually an `ValueAssignment` can be
 * mistaken for a `ObjectAssignment`. This function corrects this mistake.
 * @param {ObjectAssignment} assignment The assignment to be checked
 * @param {Module} currentModule The current module
 * @param {Module[]} modulesInScope All modules in scope
 * @function
 */
function isThisReallyAnObjectAssignment(
  assignment: ObjectAssignment,
  currentModule: Module,
  modulesInScope: Module[]
): void {
  if ('reference' in assignment.object) {
    const a: Assignment | undefined = recursivelyResolve(
      assignment.object,
      currentModule,
      modulesInScope
    );
    if (!a) {
      return;
    }
    if (a.assignmentType === AssignmentType.ValueAssignment) {
      const va: ValueAssignment = assignment as unknown as ValueAssignment;
      va.type = {
        text: assignment.definedObjectClass.module
          ? `${assignment.definedObjectClass.module}.${assignment.definedObjectClass.reference}`
          : assignment.definedObjectClass.reference,
        typeType: TypeType.DefinedType,
        type: assignment.definedObjectClass,
      };
      va.value = {
        text: assignment.object.module
          ? `${assignment.object.module}.${assignment.object.reference}`
          : assignment.object.reference,
        valueType: ValueType.DefinedValue,
        value: assignment.object,
      };
      va.assignmentType = AssignmentType.ValueAssignment;
      delete (assignment as {definedObjectClass?: any}).definedObjectClass;
      delete (assignment as {object?: any}).object;
      return;
    }
  }
}

// TODO: Handle ValueFromObject.
/**
 * In certain cases, what is actually an ObjectAssignment can be
 * mistaken for a ValueAssignment. This problem is corrected here.
 */
function isThisReallyAValueAssignment(
  assignment: ValueAssignment,
  currentModule: Module,
  modulesInScope: Module[]
): void {
  if (assignment.type.typeType === TypeType.DefinedType) {
    const a: Assignment | undefined = recursivelyResolve(
      assignment.type.type,
      currentModule,
      modulesInScope
    );
    if (!a) {
      return;
    }
    if (a.assignmentType === AssignmentType.ObjectAssignment) {
      const oa: ObjectAssignment = assignment as unknown as ObjectAssignment;
      oa.definedObjectClass = assignment.type.type as Defined;
      oa.object = assignment.value.value as Defined;
      oa.assignmentType = AssignmentType.ObjectAssignment;
      delete (assignment as {value?: any}).value;
      delete (assignment as {type?: any}).type;
      return;
    }
  }
}

export default function unconfuseObjectAndValueAssignments(
  assn: Assignment,
  currentModule: Module,
  modulesInScope: Module[]
): void {
  switch (assn.assignmentType) {
    case AssignmentType.ObjectAssignment: {
      isThisReallyAnObjectAssignment(assn, currentModule, modulesInScope);
      break;
    }
    case AssignmentType.ValueAssignment: {
      isThisReallyAValueAssignment(assn, currentModule, modulesInScope);
      break;
    }
    default: {
      break;
    }
  }
}
