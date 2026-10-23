/**
 * Type of an ASN.1 value assignment.
 *
 * A const object rather than an enum, so this module is valid under
 * `erasableSyntaxOnly`. The namespace keeps each member usable as a type.
 */
export const ValueAssignmentType = {
  BitStringValue: 'BitStringValue',
  BooleanValue: 'BooleanValue',
  CharacterStringValue: 'CharacterStringValue',
  ChoiceValue: 'ChoiceValue',
  EmbeddedPDVValue: 'EmbeddedPDVValue',
  EnumeratedValue: 'EnumeratedValue',
  ExternalValue: 'ExternalValue',
  InstanceOfValue: 'InstanceOfValue',
  IntegerValue: 'IntegerValue',
  IRIValue: 'IRIValue',
  NullValue: 'NullValue',
  ObjectIdentifierValue: 'ObjectIdentifierValue',
  OctetStringValue: 'OctetStringValue',
  RealValue: 'RealValue',
  RelativeIRIValue: 'RelativeIRIValue',
  RelativeOIDValue: 'RelativeOIDValue',
  SequenceValue: 'SequenceValue',
  SequenceOfValue: 'SequenceOfValue',
  SetValue: 'SetValue',
  SetOfValue: 'SetOfValue',
  PrefixedValue: 'PrefixedValue',
  TimeValue: 'TimeValue',
  DefinedValue: 'DefinedValue',
  ValueFromObject: 'ValueFromObject',
  OpenTypeFieldVal: 'OpenTypeFieldVal',
  FixedTypeFieldVal: 'FixedTypeFieldVal',
} as const;

export type ValueAssignmentType =
  (typeof ValueAssignmentType)[keyof typeof ValueAssignmentType];

export namespace ValueAssignmentType {
  export type BitStringValue = (typeof ValueAssignmentType)['BitStringValue'];
  export type BooleanValue = (typeof ValueAssignmentType)['BooleanValue'];
  export type CharacterStringValue = (typeof ValueAssignmentType)['CharacterStringValue'];
  export type ChoiceValue = (typeof ValueAssignmentType)['ChoiceValue'];
  export type EmbeddedPDVValue = (typeof ValueAssignmentType)['EmbeddedPDVValue'];
  export type EnumeratedValue = (typeof ValueAssignmentType)['EnumeratedValue'];
  export type ExternalValue = (typeof ValueAssignmentType)['ExternalValue'];
  export type InstanceOfValue = (typeof ValueAssignmentType)['InstanceOfValue'];
  export type IntegerValue = (typeof ValueAssignmentType)['IntegerValue'];
  export type IRIValue = (typeof ValueAssignmentType)['IRIValue'];
  export type NullValue = (typeof ValueAssignmentType)['NullValue'];
  export type ObjectIdentifierValue = (typeof ValueAssignmentType)['ObjectIdentifierValue'];
  export type OctetStringValue = (typeof ValueAssignmentType)['OctetStringValue'];
  export type RealValue = (typeof ValueAssignmentType)['RealValue'];
  export type RelativeIRIValue = (typeof ValueAssignmentType)['RelativeIRIValue'];
  export type RelativeOIDValue = (typeof ValueAssignmentType)['RelativeOIDValue'];
  export type SequenceValue = (typeof ValueAssignmentType)['SequenceValue'];
  export type SequenceOfValue = (typeof ValueAssignmentType)['SequenceOfValue'];
  export type SetValue = (typeof ValueAssignmentType)['SetValue'];
  export type SetOfValue = (typeof ValueAssignmentType)['SetOfValue'];
  export type PrefixedValue = (typeof ValueAssignmentType)['PrefixedValue'];
  export type TimeValue = (typeof ValueAssignmentType)['TimeValue'];
  export type DefinedValue = (typeof ValueAssignmentType)['DefinedValue'];
  export type ValueFromObject = (typeof ValueAssignmentType)['ValueFromObject'];
  export type OpenTypeFieldVal = (typeof ValueAssignmentType)['OpenTypeFieldVal'];
  export type FixedTypeFieldVal = (typeof ValueAssignmentType)['FixedTypeFieldVal'];
}

export default ValueAssignmentType;
