/**
 * ASN.1 Type of an ASN.1 value.
 *
 * A const object rather than an enum, so this module is valid under
 * `erasableSyntaxOnly`. The namespace keeps each member usable as a type.
 */
export const ValueType = {
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

  // Retracted
  AnyValue: 'AnyValue',
} as const;

export type ValueType = (typeof ValueType)[keyof typeof ValueType];

export namespace ValueType {
  export type BitStringValue = (typeof ValueType)['BitStringValue'];
  export type BooleanValue = (typeof ValueType)['BooleanValue'];
  export type CharacterStringValue = (typeof ValueType)['CharacterStringValue'];
  export type ChoiceValue = (typeof ValueType)['ChoiceValue'];
  export type EmbeddedPDVValue = (typeof ValueType)['EmbeddedPDVValue'];
  export type EnumeratedValue = (typeof ValueType)['EnumeratedValue'];
  export type ExternalValue = (typeof ValueType)['ExternalValue'];
  export type InstanceOfValue = (typeof ValueType)['InstanceOfValue'];
  export type IntegerValue = (typeof ValueType)['IntegerValue'];
  export type IRIValue = (typeof ValueType)['IRIValue'];
  export type NullValue = (typeof ValueType)['NullValue'];
  export type ObjectIdentifierValue = (typeof ValueType)['ObjectIdentifierValue'];
  export type OctetStringValue = (typeof ValueType)['OctetStringValue'];
  export type RealValue = (typeof ValueType)['RealValue'];
  export type RelativeIRIValue = (typeof ValueType)['RelativeIRIValue'];
  export type RelativeOIDValue = (typeof ValueType)['RelativeOIDValue'];
  export type SequenceValue = (typeof ValueType)['SequenceValue'];
  export type SequenceOfValue = (typeof ValueType)['SequenceOfValue'];
  export type SetValue = (typeof ValueType)['SetValue'];
  export type SetOfValue = (typeof ValueType)['SetOfValue'];
  export type PrefixedValue = (typeof ValueType)['PrefixedValue'];
  export type TimeValue = (typeof ValueType)['TimeValue'];
  export type DefinedValue = (typeof ValueType)['DefinedValue'];
  export type ValueFromObject = (typeof ValueType)['ValueFromObject'];
  export type OpenTypeFieldVal = (typeof ValueType)['OpenTypeFieldVal'];
  export type FixedTypeFieldVal = (typeof ValueType)['FixedTypeFieldVal'];
  export type AnyValue = (typeof ValueType)['AnyValue'];
}

export default ValueType;
