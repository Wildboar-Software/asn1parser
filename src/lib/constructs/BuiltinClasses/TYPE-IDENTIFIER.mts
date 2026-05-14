import AssignmentType from '../AssignmentType.mjs';
import type ObjectClassAssignment from '../AssignmentTypes/ObjectClassAssignment.mjs';
import FieldSpecType from '../FieldSpecType.mjs';
import TypeType from '../TypeType.mjs';

/**
 * From ITU X.681, Annex A.2:
 * `TYPE-IDENTIFIER ::= CLASS {
 *     &id OBJECT IDENTIFIER UNIQUE,
 *     &Type }
 *     WITH SYNTAX {&Type IDENTIFIED BY &id}`
 */
// ObjectClassDefn ::= CLASS "{" FieldSpec "," + "}" WithSyntaxSpec?

const TYPE_IDENTIFIER: ObjectClassAssignment = {
  identifier: 'TYPE-IDENTIFIER',
  assignmentType: AssignmentType.ObjectClassAssignment,
  leftHandSide: 'TYPE-IDENTIFIER ',
  rightHandSide:
    ' CLASS { &id OBJECT IDENTIFIER UNIQUE, &Type } WITH SYNTAX {&Type IDENTIFIED BY &id}',
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
    },
    // syntax: "&Type IDENTIFIED BY &id",
    syntax: ['&Type', 'IDENTIFIED', 'BY', '&id'],
  },
  dependencies: {},
};

export default TYPE_IDENTIFIER;
