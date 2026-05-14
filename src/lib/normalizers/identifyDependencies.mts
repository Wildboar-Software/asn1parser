import { type Assignment } from '../constructs/Assignment.mjs';
import AssignmentType from '../constructs/AssignmentType.mjs';
import type Defined from '../constructs/Defined.mjs';
import type Module from '../constructs/Module.mjs';
import type ObjectClassFieldType from '../constructs/Types/ObjectClassFieldType.mjs';
import TypeType from '../constructs/TypeType.mjs';
import type Parameter from '../constructs/Parameter.mjs';
import ValueType from '../constructs/ValueType.mjs';

/**
 * @summary If this `Defined*` comes from a parameter, get its index in the
 *  list.
 * @description
 * This function iterates over the list of parameters of a parameterized
 * assignment to see if `Defined*` is comes from the parameters rather than
 * some other assignment.
 *
 * @param {Defined} def The `Defined*` whose index is to be determined.
 * @param {Parameter[]} parameters The list of `Parameter`s that is to be
 *  searched.
 * @returns {number | undefined} The parameter's index if it is actually a
 *  parameter, otherwise `undefined`.
 * @function
 */
function getParameterIndex(
  def: Defined,
  parameters?: Parameter[]
): number | undefined {
  if (
    def.module !== undefined ||
    parameters === undefined ||
    parameters.length === 0
  ) {
    return undefined;
  }
  const i = parameters.findIndex((p) => p.dummyReference === def.reference);
  return i !== -1 ? i : undefined;
}

/**
 * @summary Recurse into the AST and annotate assignments with their
 *  dependencies.
 * @description
 * Since most programming languages enforce a define-before-use rule, but ASN.1
 * does not, we have to identify the dependencies of an assignment so that we
 * can sort the assignments correctly. This function recurses into the AST nodes
 * of an assignment and annotate that assignment with any `Defined*` references
 * it finds.
 *
 * @param thing The AST node which is to be inspected for references.
 * @param {Assignment} assignment The assignment to which dependencies shall be
 *  applied.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {number} recursionCount The depth of the current recursion.
 * @function
 */
export default function identifyDependencies( // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  thing: any, // eslint-disable-line
  assignment: Assignment,
  currentModule: Module,
  modulesInScope: Module[],
  recursionCount: number = 0
): void {
  if (recursionCount > 1000) {
    return;
  }
  if (typeof thing === 'object') {
    if (!thing) {
      // This handles null.
      return;
    } else if (Array.isArray(thing)) {
      thing.forEach((v: any): void =>
        identifyDependencies(
          v,
          assignment,
          currentModule,
          modulesInScope,
          recursionCount + 1
        )
      );
    } else if (
      'typeType' in thing &&
      typeof thing.typeType === 'string' &&
      'type' in thing
    ) {
      if (thing.typeType === TypeType.DefinedType) {
        thing.type.assignmentType = AssignmentType.TypeAssignment;
        thing.type.parameterIndex = getParameterIndex(
          thing.type,
          assignment.parameters
        );
        if (
          thing.type.parameterIndex === undefined &&
          !currentModule.definedEnumItems.has(thing.type.reference) // Filter out enum items.
        ) {
          assignment.dependencies[
            `${thing.type.module || thing.type.computedModule || ''}.${
              thing.type.reference
            }`
          ] = structuredClone(thing.type);
        }
        if (
          'parameters' in thing.type &&
          Array.isArray(thing.type.parameters)
        ) {
          (thing.type as Defined).parameters?.forEach((p) =>
            identifyDependencies(
              p,
              assignment,
              currentModule,
              modulesInScope,
              recursionCount + 1
            )
          );
        }
      } else if (thing.typeType === TypeType.ObjectClassFieldType) {
        const t: ObjectClassFieldType = thing.type;
        const d: Defined = t.definedObjectClass;
        d.assignmentType = AssignmentType.ObjectClassAssignment;
        d.parameterIndex = getParameterIndex(d, assignment.parameters);
        if (
          d.parameterIndex === undefined &&
          !currentModule.definedEnumItems.has(d.reference) // Filter out enum items.
        ) {
          assignment.dependencies[
            `${d.module || d.computedModule || ''}.${d.reference}`
          ] = structuredClone(d);
        }
      } else if (thing.typeType === TypeType.SelectionType) {
        identifyDependencies(
          thing.type.type.type,
          assignment,
          currentModule,
          modulesInScope,
          recursionCount + 1
        );
      } else {
        identifyDependencies(
          thing.type,
          assignment,
          currentModule,
          modulesInScope,
          recursionCount + 1
        );
      }
      identifyDependencies(
        thing.tagging,
        assignment,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
      identifyDependencies(
        thing.constraints,
        assignment,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
    } else if (
      'valueType' in thing &&
      typeof thing.valueType === 'string' &&
      'value' in thing
    ) {
      if (thing.valueType === ValueType.DefinedValue) {
        const d: Defined = thing.value;
        d.assignmentType = AssignmentType.ValueAssignment;
        d.parameterIndex = getParameterIndex(d, assignment.parameters);
        if (
          d.parameterIndex === undefined &&
          !currentModule.definedEnumItems.has(d.reference) // Filter out enum items.
        ) {
          assignment.dependencies[
            `${d.module || d.computedModule || ''}.${d.reference}`
          ] = structuredClone(d);
        }
      } else {
        identifyDependencies(
          thing.value,
          assignment,
          currentModule,
          modulesInScope,
          recursionCount + 1
        );
      }
    } else if (
      'reference' in thing &&
      'computedModule' in thing &&
      typeof thing.reference === 'string' &&
      typeof thing.computedModule === 'string'
    ) {
      thing.parameterIndex = getParameterIndex(thing, assignment.parameters);
      if (
        thing.parameterIndex === undefined &&
        !currentModule.definedEnumItems.has(thing.reference) // Filter out enum items.
      ) {
        assignment.dependencies[
          `${thing.module || thing.computedModule || ''}.${thing.reference}`
        ] = structuredClone(thing);
      }
      if ('parameters' in thing && Array.isArray(thing.parameters)) {
        thing.parameters.forEach((p: any) =>
          identifyDependencies(
            p,
            assignment,
            currentModule,
            modulesInScope,
            recursionCount + 1
          )
        );
      }
    } else {
      Object.values(thing).forEach((v: any): void =>
        identifyDependencies(
          v,
          assignment,
          currentModule,
          modulesInScope,
          recursionCount + 1
        )
      );
    }
  } else {
    return;
  }
}
