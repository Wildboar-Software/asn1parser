import AssignmentType from './constructs/AssignmentType.mjs';
import type Module from './constructs/Module.mjs';
import { type Type } from './constructs/Type.mjs';
import TypeType from './constructs/TypeType.mjs';
import ASN1SemanticError from './errors/ASN1SemanticError.mjs';
import getUnprefixedType from './getUnprefixedType.mjs';
import recursivelyResolve from './recursivelyResolve.mjs';

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
      const ident = innerUnresolvedType.type.module
        ? `${innerUnresolvedType.type.module}.${innerUnresolvedType.type.reference}`
        : innerUnresolvedType.type.reference;
      throw new ASN1SemanticError(
        `Identifier '${ident}' did not resolve to a type assignment`,
        (t as any).production,
        currentModule.name,
      );
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
