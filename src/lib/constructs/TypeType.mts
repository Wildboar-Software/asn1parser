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
 */
enum TypeType {
  BitStringType = 'BitStringType',
  BooleanType = 'BooleanType',
  UnrestrictedCharacterStringType = 'UnrestrictedCharacterStringType',
  ChoiceType = 'ChoiceType',
  DateType = 'DateType',
  DateTimeType = 'DateTimeType',
  DurationType = 'DurationType',
  EmbeddedPDVType = 'EmbeddedPDVType',
  EnumeratedType = 'EnumeratedType',
  ExternalType = 'ExternalType',
  InstanceOfType = 'InstanceOfType',
  IntegerType = 'IntegerType',
  IRIType = 'IRIType',
  NullType = 'NullType',
  ObjectClassFieldType = 'ObjectClassFieldType',
  ObjectIdentifierType = 'ObjectIdentifierType',
  OctetStringType = 'OctetStringType',
  RealType = 'RealType',
  RelativeIRIType = 'RelativeIRIType',
  RelativeOIDType = 'RelativeOIDType',
  SequenceType = 'SequenceType',
  SequenceOfType = 'SequenceOfType',
  SetType = 'SetType',
  SetOfType = 'SetOfType',
  PrefixedType = 'PrefixedType',
  TimeType = 'TimeType',
  TimeOfDayType = 'TimeOfDayType',
  DefinedType = 'DefinedType',
  // UsefulType = "UsefulType", // Split into separate types below.
  SelectionType = 'SelectionType',
  TypeFromObject = 'TypeFromObject',
  ValueSetFromObjects = 'ValueSetFromObjects',

  // Restricted Character String Types
  BMPString = 'BMPString',
  GeneralString = 'GeneralString',
  GraphicString = 'GraphicString',
  IA5String = 'IA5String',
  ISO646String = 'ISO646String',
  NumericString = 'NumericString',
  PrintableString = 'PrintableString',
  TeletexString = 'TeletexString',
  T61String = 'T61String',
  UniversalString = 'UniversalString',
  UTF8String = 'UTF8String',
  VideotexString = 'VideotexString',
  VisibleString = 'VisibleString',

  // UsefulTypes
  GeneralizedTime = 'GeneralizedTime',
  UTCTime = 'UTCTime',
  ObjectDescriptor = 'ObjectDescriptor',

  // Retracted
  AnyType = 'AnyType',
}

export default TypeType;
