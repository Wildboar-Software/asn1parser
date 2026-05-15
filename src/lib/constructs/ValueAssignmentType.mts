/**
 * Type of an ASN.1 value assignment.
 */
export enum ValueAssignmentType {
  BitStringValue = 'BitStringValue',
  BooleanValue = 'BooleanValue',
  CharacterStringValue = 'CharacterStringValue',
  ChoiceValue = 'ChoiceValue',
  EmbeddedPDVValue = 'EmbeddedPDVValue',
  EnumeratedValue = 'EnumeratedValue',
  ExternalValue = 'ExternalValue',
  InstanceOfValue = 'InstanceOfValue',
  IntegerValue = 'IntegerValue',
  IRIValue = 'IRIValue',
  NullValue = 'NullValue',
  ObjectIdentifierValue = 'ObjectIdentifierValue',
  OctetStringValue = 'OctetStringValue',
  RealValue = 'RealValue',
  RelativeIRIValue = 'RelativeIRIValue',
  RelativeOIDValue = 'RelativeOIDValue',
  SequenceValue = 'SequenceValue',
  SequenceOfValue = 'SequenceOfValue',
  SetValue = 'SetValue',
  SetOfValue = 'SetOfValue',
  PrefixedValue = 'PrefixedValue',
  TimeValue = 'TimeValue',
  DefinedValue = 'DefinedValue',
  ValueFromObject = 'ValueFromObject',
  OpenTypeFieldVal = 'OpenTypeFieldVal',
  FixedTypeFieldVal = 'FixedTypeFieldVal',
}

export default ValueAssignmentType;
