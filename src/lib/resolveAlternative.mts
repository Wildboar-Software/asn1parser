import { type Assignment } from './constructs/Assignment.mjs';
import AssignmentType from './constructs/AssignmentType.mjs';
import type NamedType from './constructs/NamedType.mjs';
import recursivelyResolve from './recursivelyResolve.mjs';
import { type Type } from './constructs/Type.mjs';
import TypeType from './constructs/TypeType.mjs';
import type Module from './constructs/Module.mjs';

/**
 * @deprecated
 */
export default function resolveAlternative(
  altName: string,
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  recursionCount: number = 0
): Type | undefined {
  if (recursionCount > 20) {
    throw new Error(
      `Recursion exceed when trying to resolve alternative '${altName}'.`
    );
  }
  switch (type_.typeType) {
    case TypeType.ChoiceType: {
      const rootAlt: NamedType | undefined =
        type_.type.rootAlternativeTypeList.find(
          (rat) => rat.identifier === altName
        );
      if (rootAlt) {
        return rootAlt.type;
      }
      const extensionAdditions = type_.type.extensionAdditionAlternatives || [];
      for (let x: number = 0; x < extensionAdditions.length; x++) {
        const xa = extensionAdditions[x];
        if ('alternativeTypeList' in xa) {
          for (let y: number = 0; y < xa.alternativeTypeList.length; y++) {
            const at = xa.alternativeTypeList[y];
            if (at.identifier === altName) {
              return at.type;
            }
          }
        } else if (xa.identifier === altName) {
          return xa.type;
        }
      }
      return undefined;
    }
    case TypeType.ObjectClassFieldType: {
      return undefined; // FIXME:
    }
    case TypeType.PrefixedType: {
      return resolveAlternative(
        altName,
        type_.type,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
    }
    case TypeType.DefinedType: {
      const assn: Assignment | undefined = recursivelyResolve(
        type_.type,
        currentModule,
        modulesInScope
      );
      if (!assn) {
        return undefined;
      }
      if (assn.assignmentType !== AssignmentType.TypeAssignment) {
        throw new Error(
          `SelectionType '${altName}' selected from a non-type assignment.`
        );
      }
      return resolveAlternative(
        altName,
        assn.type,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
    }
    case TypeType.SelectionType: {
      return resolveAlternative(
        altName,
        type_.type.type,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
    }
    case TypeType.TypeFromObject: {
      return undefined; // FIXME:
    }
    default: {
      throw new Error('SelectionType selected from a non-CHOICE type.');
    }
  }
}
