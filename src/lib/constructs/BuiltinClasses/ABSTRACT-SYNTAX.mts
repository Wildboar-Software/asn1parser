import AssignmentType from '../AssignmentType.mjs';
import type ObjectClassAssignment from '../AssignmentTypes/ObjectClassAssignment.mjs';
import FieldSpecType from '../FieldSpecType.mjs';
import TypeType from '../TypeType.mjs';
import ValueType from '../ValueType.mjs';

/**
 * A built-in information object class that defines an abstract syntax
 * with an object identifier.
 * 
 * From ITU X.681, Annex B:
 *
 * ```asn1
 * ABSTRACT-SYNTAX ::= CLASS {
 *     &id OBJECT IDENTIFIER UNIQUE,
 *     &Type,
 *     &property BIT STRING {handles-invalid-encodings(0)} DEFAULT {} }
 *     WITH SYNTAX { &Type IDENTIFIED BY &id [HAS PROPERTY &property] }
 * ```
 */
const ABSTRACT_SYNTAX: ObjectClassAssignment = {
  identifier: 'ABSTRACT-SYNTAX',
  assignmentType: AssignmentType.ObjectClassAssignment,
  leftHandSide: 'ABSTRACT-SYNTAX ',
  rightHandSide:
    ' CLASS { &id OBJECT IDENTIFIER UNIQUE, &Type, &property BIT STRING {handles-invalid-encodings(0)} DEFAULT {} }' +
    ' WITH SYNTAX { &Type IDENTIFIED BY &id [HAS PROPERTY &property] }',
  objectClass: {
    fieldSpecs: {
      '&id': {
        specType: FieldSpecType.FixedTypeValueFieldSpec,
        type: {
          text: 'OBJECT IDENTIFIER',
          typeType: TypeType.ObjectIdentifierType,
          type: 'OBJECT IDENTIFIER',
        },
        unique: true,
        optional: false,
      },
      '&Type': {
        specType: FieldSpecType.TypeFieldSpec,
        optional: false,
      },
      '&property': {
        specType: FieldSpecType.FixedTypeValueFieldSpec,
        type: {
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
        },
        unique: false,
        optional: true,
        default: {
          text: '{}',
          valueType: ValueType.BitStringValue,
          value: {},
        },
      },
    },
    syntax: [
      '&Type',
      'IDENTIFIED',
      'BY',
      '&id',
      ['HAS', 'PROPERTY', '&property'],
    ],
  },
  dependencies: {},
};

export default ABSTRACT_SYNTAX;
