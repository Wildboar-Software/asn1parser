// CharacterStringType ::=
//     RestrictedCharacterStringType
//     | UnrestrictedCharacterStringType

// RestrictedCharacterStringType ::=
//       BMPString
//     | GeneralString
//     | GraphicString
//     | IA5String
//     | ISO646String
//     | NumericString
//     | PrintableString
//     | TeletexString
//     | T61String
//     | UniversalString
//     | UTF8String
//     | VideotexString
//     | VisibleString
//
// UnrestrictedCharacterStringType ::= CHARACTER STRING
//
// The BNF specifications say that `UsefulType` is simply a `typeidentifier`,
// but it is really:
//
// UsefulType ::=
//     GeneralizedTime
//     | UTCTime
//     | ObjectDescriptor

/**
 * Type of an ASN.1 type.
 *
 * A const object rather than an enum, so this module is valid under
 * `erasableSyntaxOnly`. The namespace keeps each member usable as a type.
 */
export const TypeType = {
  BitStringType: 'BitStringType',
  BooleanType: 'BooleanType',
  UnrestrictedCharacterStringType: 'UnrestrictedCharacterStringType',
  ChoiceType: 'ChoiceType',
  DateType: 'DateType',
  DateTimeType: 'DateTimeType',
  DurationType: 'DurationType',
  EmbeddedPDVType: 'EmbeddedPDVType',
  EnumeratedType: 'EnumeratedType',
  ExternalType: 'ExternalType',
  InstanceOfType: 'InstanceOfType',
  IntegerType: 'IntegerType',
  IRIType: 'IRIType',
  NullType: 'NullType',
  ObjectClassFieldType: 'ObjectClassFieldType',
  ObjectIdentifierType: 'ObjectIdentifierType',
  OctetStringType: 'OctetStringType',
  RealType: 'RealType',
  RelativeIRIType: 'RelativeIRIType',
  RelativeOIDType: 'RelativeOIDType',
  SequenceType: 'SequenceType',
  SequenceOfType: 'SequenceOfType',
  SetType: 'SetType',
  SetOfType: 'SetOfType',
  PrefixedType: 'PrefixedType',
  TimeType: 'TimeType',
  TimeOfDayType: 'TimeOfDayType',
  DefinedType: 'DefinedType',
  // UsefulType = "UsefulType", // Split into separate types below.
  SelectionType: 'SelectionType',
  TypeFromObject: 'TypeFromObject',
  ValueSetFromObjects: 'ValueSetFromObjects',

  // Restricted Character String Types
  BMPString: 'BMPString',
  GeneralString: 'GeneralString',
  GraphicString: 'GraphicString',
  IA5String: 'IA5String',
  ISO646String: 'ISO646String',
  NumericString: 'NumericString',
  PrintableString: 'PrintableString',
  TeletexString: 'TeletexString',
  T61String: 'T61String',
  UniversalString: 'UniversalString',
  UTF8String: 'UTF8String',
  VideotexString: 'VideotexString',
  VisibleString: 'VisibleString',

  // UsefulTypes
  GeneralizedTime: 'GeneralizedTime',
  UTCTime: 'UTCTime',
  ObjectDescriptor: 'ObjectDescriptor',

  // Retracted
  AnyType: 'AnyType',
} as const;

export type TypeType = (typeof TypeType)[keyof typeof TypeType];

export namespace TypeType {
  export type BitStringType = (typeof TypeType)['BitStringType'];
  export type BooleanType = (typeof TypeType)['BooleanType'];
  export type UnrestrictedCharacterStringType = (typeof TypeType)['UnrestrictedCharacterStringType'];
  export type ChoiceType = (typeof TypeType)['ChoiceType'];
  export type DateType = (typeof TypeType)['DateType'];
  export type DateTimeType = (typeof TypeType)['DateTimeType'];
  export type DurationType = (typeof TypeType)['DurationType'];
  export type EmbeddedPDVType = (typeof TypeType)['EmbeddedPDVType'];
  export type EnumeratedType = (typeof TypeType)['EnumeratedType'];
  export type ExternalType = (typeof TypeType)['ExternalType'];
  export type InstanceOfType = (typeof TypeType)['InstanceOfType'];
  export type IntegerType = (typeof TypeType)['IntegerType'];
  export type IRIType = (typeof TypeType)['IRIType'];
  export type NullType = (typeof TypeType)['NullType'];
  export type ObjectClassFieldType = (typeof TypeType)['ObjectClassFieldType'];
  export type ObjectIdentifierType = (typeof TypeType)['ObjectIdentifierType'];
  export type OctetStringType = (typeof TypeType)['OctetStringType'];
  export type RealType = (typeof TypeType)['RealType'];
  export type RelativeIRIType = (typeof TypeType)['RelativeIRIType'];
  export type RelativeOIDType = (typeof TypeType)['RelativeOIDType'];
  export type SequenceType = (typeof TypeType)['SequenceType'];
  export type SequenceOfType = (typeof TypeType)['SequenceOfType'];
  export type SetType = (typeof TypeType)['SetType'];
  export type SetOfType = (typeof TypeType)['SetOfType'];
  export type PrefixedType = (typeof TypeType)['PrefixedType'];
  export type TimeType = (typeof TypeType)['TimeType'];
  export type TimeOfDayType = (typeof TypeType)['TimeOfDayType'];
  export type DefinedType = (typeof TypeType)['DefinedType'];
  export type SelectionType = (typeof TypeType)['SelectionType'];
  export type TypeFromObject = (typeof TypeType)['TypeFromObject'];
  export type ValueSetFromObjects = (typeof TypeType)['ValueSetFromObjects'];
  export type BMPString = (typeof TypeType)['BMPString'];
  export type GeneralString = (typeof TypeType)['GeneralString'];
  export type GraphicString = (typeof TypeType)['GraphicString'];
  export type IA5String = (typeof TypeType)['IA5String'];
  export type ISO646String = (typeof TypeType)['ISO646String'];
  export type NumericString = (typeof TypeType)['NumericString'];
  export type PrintableString = (typeof TypeType)['PrintableString'];
  export type TeletexString = (typeof TypeType)['TeletexString'];
  export type T61String = (typeof TypeType)['T61String'];
  export type UniversalString = (typeof TypeType)['UniversalString'];
  export type UTF8String = (typeof TypeType)['UTF8String'];
  export type VideotexString = (typeof TypeType)['VideotexString'];
  export type VisibleString = (typeof TypeType)['VisibleString'];
  export type GeneralizedTime = (typeof TypeType)['GeneralizedTime'];
  export type UTCTime = (typeof TypeType)['UTCTime'];
  export type ObjectDescriptor = (typeof TypeType)['ObjectDescriptor'];
  export type AnyType = (typeof TypeType)['AnyType'];
}

export default TypeType;
