import { type Assignment } from './constructs/Assignment.mjs';
import AssignmentType from './constructs/AssignmentType.mjs';
import getUnderlyingTypeFromObjectClassFieldType from './getUnderlyingTypeFromObjectClassFieldType.mjs';
import getUnderlyingType from './getUnderlyingType.mjs';
import recursivelyResolve from './recursivelyResolve.mjs';
import type Module from './constructs/Module.mjs';
import type Tagging from './constructs/Tagging.mjs';
import { type Type } from './constructs/Type.mjs';
import typeToTagNumberMap from './maps/typeToTagNumberMap.mjs';
import TypeType from './constructs/TypeType.mjs';
import type ObjectAssignment from './constructs/AssignmentTypes/ObjectAssignment.mjs';
import type ObjectSetAssignment from './constructs/AssignmentTypes/ObjectSetAssignment.mjs';
import ASN1SemanticError from './errors/ASN1SemanticError.mjs';

/**
 * @summary Determine the outermost tag of a given type.
 * @description
 * Determine the outermost tag of the given type. The _outermost_ tag must be
 * determined so that components and alternatives of serialized `SET`,
 * `SEQUENCE`, and `CHOICE` types can be identified.
 *
 * @param {Type} type_ The type whose outermost tag is to be determined.
 * @param {Module} currentModule The current module.
 * @param {Module[]} modulesInScope The modules in scope, which can be searched.
 * @param {number} recursionCount The depth of the current recursion.
 * @returns The outermost `Tagging`, if it can be determined, else `undefined`.
 */
export default function getOutermostTag(
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  recursionCount: number
): Tagging | undefined {
  if (recursionCount > 20) {
    throw new ASN1SemanticError(
      `Recursion exceeded in trying to get outermost tag for type '${type_.typeType}'.`,
      (type_ as any).production,
      currentModule.name,
    );
  }
  if (type_.tagging) {
    return type_.tagging;
  }
  switch (type_.typeType) {
    case TypeType.AnyType:
    case TypeType.ChoiceType:
    case TypeType.PrefixedType: {
      return type_.tagging;
    }
    case TypeType.DefinedType: {
      const a: Assignment | undefined = recursivelyResolve(
        type_.type,
        currentModule,
        modulesInScope
      );
      if (!a) {
        return type_.tagging;
      }
      if (a.assignmentType !== AssignmentType.TypeAssignment) {
        throw new ASN1SemanticError(
          `Defined type '${type_.type.reference}' did not refer to a type assignment.`,
          type_.type.production ?? type_.production,
          currentModule.name,
        );
      }
      return getOutermostTag(
        a.type,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
    }
    case TypeType.ObjectClassFieldType: {
      const typeType: TypeType | undefined =
        getUnderlyingTypeFromObjectClassFieldType(
          type_.type.definedObjectClass,
          type_.type.fieldName,
          currentModule,
          modulesInScope,
          0
        )?.typeType;
      if (!typeType) {
        return type_.tagging;
      }
      const tagNumber: number | undefined = typeToTagNumberMap.get(typeType);
      if (!tagNumber) {
        return type_.tagging;
      } else {
        return {
          tag: {
            class_: 'UNIVERSAL',
            classNumber: tagNumber,
          },
        };
      }
    }
    case TypeType.SelectionType: {
      const typeType: TypeType | undefined = getUnderlyingType(
        type_.type.type,
        currentModule,
        modulesInScope,
        0
      )?.typeType;
      if (!typeType) {
        return type_.tagging;
      }
      const tagNumber: number | undefined = typeToTagNumberMap.get(typeType);
      if (!tagNumber) {
        return type_.tagging;
      } else {
        return {
          tag: {
            class_: 'UNIVERSAL',
            classNumber: tagNumber,
          },
        };
      }
    }
    case TypeType.TypeFromObject:
    case TypeType.ValueSetFromObjects: {
      const a: Assignment | undefined = recursivelyResolve(
        type_.type.referencedObjects,
        currentModule,
        modulesInScope
      );
      if (!a) {
        return type_.tagging;
      }
      if (
        a.assignmentType !== AssignmentType.ObjectAssignment &&
        a.assignmentType !== AssignmentType.ObjectSetAssignment
      ) {
        throw new ASN1SemanticError(
          `'${type_.type.referencedObjects}' did not refer to an object or object set.`,
          type_.production,
          currentModule.name,
        );
      }
      const oa: ObjectAssignment | ObjectSetAssignment = a;
      const typeType: TypeType | undefined =
        getUnderlyingTypeFromObjectClassFieldType(
          oa.definedObjectClass,
          type_.type.fieldName,
          currentModule,
          modulesInScope,
          0
        )?.typeType;
      if (!typeType) {
        return type_.tagging;
      }
      const tagNumber: number | undefined = typeToTagNumberMap.get(typeType);
      if (!tagNumber) {
        return type_.tagging;
      } else {
        return {
          tag: {
            class_: 'UNIVERSAL',
            classNumber: tagNumber,
          },
        };
      }
    }
    default: {
      const tagNumber: number | undefined = typeToTagNumberMap.get(
        type_.typeType
      );
      if (!tagNumber) {
        return type_.tagging;
      } else {
        return {
          tag: {
            class_: 'UNIVERSAL',
            classNumber: tagNumber,
          },
        };
      }
    }
  }
}
