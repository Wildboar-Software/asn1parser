/**
 * Type of an ASN.1 assignment.
 *
 * A const object rather than an enum, so this module is valid under
 * `erasableSyntaxOnly`. The namespace keeps each member usable as a type.
 */
export const AssignmentType = {
  TypeAssignment: 'TypeAssignment',
  ValueAssignment: 'ValueAssignment',
  XMLValueAssignment: 'XMLValueAssignment',
  ValueSetTypeAssignment: 'ValueSetTypeAssignment',
  ObjectClassAssignment: 'ObjectClassAssignment',
  ObjectAssignment: 'ObjectAssignment',
  ObjectSetAssignment: 'ObjectSetAssignment',
  ParameterizedTypeAssignment: 'ParameterizedTypeAssignment',
  ParameterizedValueAssignment: 'ParameterizedValueAssignment',
  ParameterizedValueSetTypeAssignment: 'ParameterizedValueSetTypeAssignment',
  ParameterizedObjectClassAssignment: 'ParameterizedObjectClassAssignment',
  ParameterizedObjectAssignment: 'ParameterizedObjectAssignment',
  ParameterizedObjectSetAssignment: 'ParameterizedObjectSetAssignment',
} as const;

export type AssignmentType = (typeof AssignmentType)[keyof typeof AssignmentType];

export namespace AssignmentType {
  export type TypeAssignment = (typeof AssignmentType)['TypeAssignment'];
  export type ValueAssignment = (typeof AssignmentType)['ValueAssignment'];
  export type XMLValueAssignment = (typeof AssignmentType)['XMLValueAssignment'];
  export type ValueSetTypeAssignment = (typeof AssignmentType)['ValueSetTypeAssignment'];
  export type ObjectClassAssignment = (typeof AssignmentType)['ObjectClassAssignment'];
  export type ObjectAssignment = (typeof AssignmentType)['ObjectAssignment'];
  export type ObjectSetAssignment = (typeof AssignmentType)['ObjectSetAssignment'];
  export type ParameterizedTypeAssignment = (typeof AssignmentType)['ParameterizedTypeAssignment'];
  export type ParameterizedValueAssignment = (typeof AssignmentType)['ParameterizedValueAssignment'];
  export type ParameterizedValueSetTypeAssignment = (typeof AssignmentType)['ParameterizedValueSetTypeAssignment'];
  export type ParameterizedObjectClassAssignment = (typeof AssignmentType)['ParameterizedObjectClassAssignment'];
  export type ParameterizedObjectAssignment = (typeof AssignmentType)['ParameterizedObjectAssignment'];
  export type ParameterizedObjectSetAssignment = (typeof AssignmentType)['ParameterizedObjectSetAssignment'];
}

export default AssignmentType;
