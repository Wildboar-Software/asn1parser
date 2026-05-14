import AssignmentType from './constructs/AssignmentType.js';
import type Module from './constructs/Module.js';
import { type Type } from './constructs/Type.js';
import TypeType from './constructs/TypeType.js';
import getUnprefixedType from './getUnprefixedType.js';
import recursivelyResolve from './recursivelyResolve.js';

/**
 * @summary "Drill into" the given type and return its underlying type.
 * @description
 * Recursively drills into the given type and returns the underlying builtin
 * type if it can be found, or `undefined` otherwise. "Drill into," in this
 * context, refers to:
 *
 * - Removing prefixes on the type by recursing into `PrefixedType`'s type.
 * - Resolving the type to which a `DefinedType` refers.
 *
 * Despite the name, this also resolves the `UsefulType` alternatives.
 *
 * In the future, more will be done to resolve the builtin type.
 *
 * @param {Type} t
 * @param {Module} currentModule
 * @param {Module[]} modulesInScope
 * @returns The underlying builtin type, or `undefined` if it cannot be found.
 */
export default function getBuiltinType(
  t: Type,
  currentModule: Module,
  modulesInScope: Module[]
): Type | undefined {
  let innerUnresolvedType = getUnprefixedType(t);
  while (innerUnresolvedType.typeType === TypeType.DefinedType) {
    const ta = recursivelyResolve(
      innerUnresolvedType.type,
      currentModule,
      modulesInScope
    );
    if (!ta) {
      return undefined;
    }
    if (ta.assignmentType !== AssignmentType.TypeAssignment) {
      throw new Error();
    }
    innerUnresolvedType = getUnprefixedType(ta.type);
  }
  // TODO: Handle ConstrainedType
  // TODO: Resolve SelectionType
  // TODO: Resolve TypeFromObject
  // TODO: Resolve ValueSetFromObjects
  // TODO: Resolve ObjectClassFieldType
  return innerUnresolvedType;
}
