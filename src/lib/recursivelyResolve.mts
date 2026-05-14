import { type Assignment } from './constructs/Assignment.mjs';
import type Defined from './constructs/Defined.mjs';
import type Module from './constructs/Module.mjs';
import TypeType from './constructs/TypeType.mjs';
import resolve from './resolve.mjs';
import AssignmentType from './constructs/AssignmentType.mjs';
import type TypeAssignment from './constructs/AssignmentTypes/TypeAssignment.mjs';
import type ValueAssignment from './constructs/AssignmentTypes/ValueAssignment.mjs';
import type ObjectAssignment from './constructs/AssignmentTypes/ObjectAssignment.mjs';
import type ObjectClassAssignment from './constructs/AssignmentTypes/ObjectClassAssignment.mjs';
import ValueType from './constructs/ValueType.mjs';

/**
 * @summary Resolve the assignment to which a reference refers.
 * @description
 * Determine the assignment to which a reference refers. If the resolved
 * assignment is an alias for a reference, that reference will, in turn, be
 * resolved recursively until the resulting assignment is not an alias for a
 * reference.
 *
 * If you do not want this recursive behavior, consider using `resolve()`
 * instead.

 * @param {Defined} def The reference to be resolved.
 * @param {Module} currentModule The current module, which will be searched
 *  first.
 * @param {Module[]} modulesInScope All modules in scope.
 * @returns The `Assigment` if it can be resolved, otherwise `undefined`.
 * @function
 */
export default function recursivelyResolve(
  def: Defined,
  currentModule: Module,
  modulesInScope: Module[]
): Assignment | undefined {
  let i: number = 0;
  let currentDef: Defined = def;
  while (i < 20) {
    const a: Assignment | undefined = resolve(
      currentDef,
      currentModule,
      modulesInScope
    );
    if (!a) {
      return undefined;
    }
    switch (a.assignmentType) {
      case AssignmentType.ObjectAssignment: {
        const oa: ObjectAssignment = a;
        if ('reference' in oa.object) {
          // DefinedObject
          currentDef = oa.object;
        } else {
          // ObjectFromObject
          return oa;
        }
        break;
      }
      case AssignmentType.ObjectClassAssignment: {
        const oca: ObjectClassAssignment = a;
        if ('reference' in oca.objectClass) {
          currentDef = oca.objectClass;
        } else {
          return oca;
        }
        break;
      }
      case AssignmentType.TypeAssignment: {
        const ta: TypeAssignment = a;
        if (ta.type.typeType !== TypeType.DefinedType) {
          return ta;
        }
        currentDef = ta.type.type;
        break;
      }
      case AssignmentType.ValueAssignment: {
        const va: ValueAssignment = a;
        if (va.value.valueType !== ValueType.DefinedValue) {
          return va;
        }
        currentDef = va.value.value;
        break;
      }
      default: {
        return a;
      }
    }
    i++;
  }
  throw new Error(
    `Recursion exceeded when trying to deeply resolve '${def.reference}'.`
  );
}
