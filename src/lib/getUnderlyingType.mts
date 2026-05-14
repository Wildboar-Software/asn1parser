import { type Assignment } from './constructs/Assignment.mjs';
import AssignmentType from './constructs/AssignmentType.mjs';
import type Module from './constructs/Module.mjs';
import { type Type } from './constructs/Type.mjs';
import type TypeAssignment from './constructs/AssignmentTypes/TypeAssignment.mjs';
import TypeType from './constructs/TypeType.mjs';
import recursivelyResolve from './recursivelyResolve.mjs';
import getUnderlyingTypeFromObjectClassFieldType from './getUnderlyingTypeFromObjectClassFieldType.mjs';
import type SelectionType from './constructs/Types/SelectionType.mjs';
import type ChoiceType from './constructs/Types/ChoiceType.mjs';
import type NamedType from './constructs/NamedType.mjs';

/**
 * @summary Get the underlying type of a given `Type`
 * @description
 * Resolves the underlying type to which a type refers, which could be itself.
 * @param {Type} type_ The type whose underlying type is to be determined.
 * @param {Module} currentModule The current module.
 * @param {Module[]} modulesInScope All modules within scope.
 * @param {number} recursionCount The depth of the current recursion.
 * @returns The `Type`, if it can be determined, otherwise `undefined`.
 */
export default function getUnderlyingType(
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  recursionCount: number
): Type | undefined {
  switch (type_.typeType) {
    case TypeType.SelectionType: {
      const t: SelectionType = type_.type;
      let choiceType: ChoiceType | undefined = undefined;
      if (t.type.typeType === TypeType.DefinedType) {
        const a = recursivelyResolve(
          t.type.type,
          currentModule,
          modulesInScope
        );
        if (!a) {
          // We could not find the CHOICE to which this type refers.
          return undefined;
        }
        if (a.assignmentType !== AssignmentType.TypeAssignment) {
          throw new Error(
            `SelectionType pointed to '${t.type.type.reference}', which is not a type.`
          );
        }
        const ta: TypeAssignment = a;
        if (ta.type.typeType !== TypeType.ChoiceType) {
          throw new Error(
            `SelectionType pointed to '${t.type.type.reference}', which is not a CHOICE type.`
          );
        }
        choiceType = ta.type.type;
      } else if (t.type.typeType === TypeType.ChoiceType) {
        // It must already be a CHOICE.
        choiceType = t.type.type;
      } else {
        throw new Error("SelectionType's Type, is not a CHOICE type.");
      }

      let choice: NamedType | undefined =
        choiceType.rootAlternativeTypeList.find(
          (nt: NamedType): boolean => nt.identifier === t.identifier
        );
      if (!choice) {
        if (choiceType.extensionAdditionAlternatives) {
          for (
            let i: number = 0;
            i < choiceType.extensionAdditionAlternatives.length;
            i++
          ) {
            const ea = choiceType.extensionAdditionAlternatives[i];
            if ('alternativeTypeList' in ea) {
              for (let j: number = 0; j < ea.alternativeTypeList.length; j++) {
                const at = ea.alternativeTypeList[j];
                if (at.identifier === t.identifier) {
                  choice = at;
                  i = Infinity;
                  j = Infinity;
                }
              }
            } else if (ea.identifier === t.identifier) {
              choice = ea;
              i = Infinity;
            }
          }
        } else {
          throw new Error(
            `SelectionType identifier '${t.identifier}' did not refer to a valid alternative.`
          );
        }
      }

      if (!choice) {
        throw new Error(
          `SelectionType identifier '${t.identifier}' did not refer to a valid alternative.`
        );
      }

      return getUnderlyingType(
        choice.type,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
    }
    case TypeType.PrefixedType: {
      return getUnderlyingType(
        type_.type,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
    }
    case TypeType.DefinedType: {
      const t: Assignment | undefined = recursivelyResolve(
        type_.type,
        currentModule,
        modulesInScope
      );
      if (t?.assignmentType === AssignmentType.TypeAssignment) {
        return getUnderlyingType(
          t.type,
          currentModule,
          modulesInScope,
          recursionCount + 1
        );
      } else if (t?.assignmentType === AssignmentType.ValueAssignment) {
        return getUnderlyingType(
          t.type,
          currentModule,
          modulesInScope,
          recursionCount + 1
        );
      } else {
        return undefined;
      }
    }
    case TypeType.ObjectClassFieldType: {
      return getUnderlyingTypeFromObjectClassFieldType(
        type_.type.definedObjectClass,
        type_.type.fieldName,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
    }
    default: {
      return type_;
    }
  }
}
