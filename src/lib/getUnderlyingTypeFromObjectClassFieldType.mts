import { type Assignment } from './constructs/Assignment.mjs';
import AssignmentType from './constructs/AssignmentType.mjs';
import type Defined from './constructs/Defined.mjs';
import type Module from './constructs/Module.mjs';
import { type Type } from './constructs/Type.mjs';
import TypeType from './constructs/TypeType.mjs';
import recursivelyResolve from './recursivelyResolve.mjs';
import type ObjectClassAssignment from './constructs/AssignmentTypes/ObjectClassAssignment.mjs';
import { type FieldName } from './constructs/FieldName.mjs';
import FieldSpecType from './constructs/FieldSpecType.mjs';
import getUnderlyingType from './getUnderlyingType.mjs';
import ASN1SemanticError from './errors/ASN1SemanticError.mjs';

/**
 * @summary Get the underlying type of an `ObjectClassFieldType`
 * @description
 * Resolves the underlying type to which an `ObjectClassFieldType` refers.
 * @param {Defined} definedObjectClass A reference to the object class whose
 *  field is to be queried to obtain the underlying type.
 * @param {FieldName} fieldName The sequence of primitive field names to
 *  query recursively to obtain the type.
 * @param {Module} currentModule The current module.
 * @param {Module[]} modulesInScope All modules within scope.
 * @param {number} recursionCount The depth of the current recursion.
 * @returns The `Type`, if it can be determined, otherwise `undefined`.
 */
export default function getUnderlyingTypeFromObjectClassFieldType(
  definedObjectClass: Defined,
  fieldName: FieldName,
  currentModule: Module,
  modulesInScope: Module[],
  recursionCount: number
): Type | undefined {
  if (fieldName.length === 0) {
    return undefined;
  }
  const a: Assignment | undefined = recursivelyResolve(
    definedObjectClass,
    currentModule,
    modulesInScope
  );
  if (!a) {
    return undefined;
  }
  if (a.assignmentType !== AssignmentType.ObjectClassAssignment) {
    throw new ASN1SemanticError(
      'ObjectClassFieldType referred to a non-object class assignment.',
      definedObjectClass.production,
      currentModule.name,
    );
  }
  const oca: ObjectClassAssignment = a;
  if (!('fieldSpecs' in oca.objectClass)) {
    if (
      oca.identifier === 'TYPE-IDENTIFIER' ||
      oca.identifier === 'ABSTRACT-SYNTAX'
    ) {
      if (fieldName.length !== 1) {
        throw new ASN1SemanticError(
          `Invalid FieldName '${fieldName.join('.')}' in '${oca.identifier}'.`,
          definedObjectClass.production, // Not exactly correct.
          currentModule.name,
        );
      }
      switch (fieldName[0]) {
        case '&id':
          return {
            text: 'OBJECT IDENTIFIER',
            typeType: TypeType.ObjectIdentifierType,
            type: 'OBJECT IDENTIFIER',
          };
        case '&Type':
          return undefined;
        case '&property':
          return {
            text: 'BIT STRING {handles-invalid-encodings(0)}',
            typeType: TypeType.BitStringType,
            type: {
              namedBitList: [
                {
                  identifier: 'handles-invalid-encodings',
                  number: 0,
                },
              ],
              selfContained: true,
            },
          };
        default: {
          throw new ASN1SemanticError(
            `Invalid FieldName '${fieldName[0]}' in '${oca.identifier}'.`,
            definedObjectClass.production, // Not exactly correct.
            currentModule.name,
          );
        }
      }
    }
    return getUnderlyingTypeFromObjectClassFieldType(
      oca.objectClass,
      fieldName.slice(1),
      currentModule,
      modulesInScope,
      recursionCount + 1
    );
  }
  const fs = oca.objectClass.fieldSpecs[fieldName[0]];
  if (fieldName.length === 1) {
    // We are at the end of the chain.
    if (
      fs.specType === FieldSpecType.FixedTypeValueFieldSpec ||
      fs.specType === FieldSpecType.FixedTypeValueSetFieldSpec
    ) {
      return getUnderlyingType(
        fs.type,
        currentModule,
        modulesInScope,
        recursionCount + 1
      );
    } else {
      return undefined;
    }
  } else if (
    fs.specType === FieldSpecType.ObjectFieldSpec ||
    fs.specType === FieldSpecType.ObjectSetFieldSpec
  ) {
    return getUnderlyingTypeFromObjectClassFieldType(
      fs.definedObjectClass,
      fieldName.slice(1),
      currentModule,
      modulesInScope,
      recursionCount + 1
    );
  } else {
    throw new ASN1SemanticError(
      `Non-terminal PrimitiveFieldName '${fieldName[0]}' ` +
        'did not refer to an object or object set. ' +
        `Instead, it refered to a ${fs.specType}.`,
      definedObjectClass.production, // Not exactly correct.
      currentModule.name,
    );
  }
}
