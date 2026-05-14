import type Defined from './constructs/Defined.mjs';
import type Module from './constructs/Module.mjs';
import AssignmentType from './constructs/AssignmentType.mjs';
import TypeType from './constructs/TypeType.mjs';
import recursivelyResolve from './recursivelyResolve.mjs';

/**
 * @summary Determine if a dependency is heritable.
 * @description
 * Unfortunately, ASN.1 apparently allows users to refer to values of a type
 * without importing that type. For example, an information object of class
 * `PERSON` may have a field whose value is of type `Gender`; such an
 * information object could reference the `male` value of `Gender` without
 * actually importing `Gender`.
 *
 * This function returns a `boolean` indicating whether a given dependency is
 * "heritable." Meaning that it is "implicitly imported" to a value of a given
 * type or an object of a given class.
 *
 * @param {Defined} dep The dependency to be resolved.
 * @param {Module} currentModule The current module, which will be searched
 *  first.
 * @param {Module[]} modulesInScope All modules in scope.
 * @function
 */
export default function isHeritableDependency(
  dep: Defined,
  currentModule: Module,
  modulesInScope: Module[]
): boolean {
  const ta = recursivelyResolve(dep, currentModule, modulesInScope);
  if (!ta || ta.assignmentType !== AssignmentType.TypeAssignment) {
    return false;
  }
  if (
    ta.type.typeType === TypeType.BitStringType &&
    ta.type.type.namedBitList
  ) {
    return true;
  }
  if (ta.type.typeType === TypeType.EnumeratedType) {
    return true;
  }
  if (
    ta.type.typeType === TypeType.IntegerType &&
    ta.type.type.namedNumberList
  ) {
    return true;
  }
  return false;
}
