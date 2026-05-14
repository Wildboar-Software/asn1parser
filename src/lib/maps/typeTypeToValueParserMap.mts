import * as parserFor from '../parsers/specific/index.mjs';
import Parser from '../Parser.mjs';
import TypeType from '../constructs/TypeType.mjs';

/**
 * @summary A mapping of ASN.1 builtin data types to the corresponding `Value`
 *  parsers for the corresponding `Value` type.
 * @constant
 */
export default new Map<TypeType, Parser>([
  [TypeType.BitStringType, parserFor.BitStringValue],
  [TypeType.BooleanType, parserFor.BooleanValue],
  // [ TypeType.CharacterStringType, parserFor.Char ],
  [TypeType.ChoiceType, parserFor.ChoiceValue],
  [TypeType.DateType, parserFor.TimeValue],
  [TypeType.DateTimeType, parserFor.TimeValue],
  [TypeType.DurationType, parserFor.TimeValue],
  [TypeType.EmbeddedPDVType, parserFor.EmbeddedPDVValue],
  [TypeType.EnumeratedType, parserFor.EnumeratedValue],
  [TypeType.ExternalType, parserFor.ExternalValue],
  [TypeType.InstanceOfType, parserFor.InstanceOfValue],
  [TypeType.IntegerType, parserFor.IntegerValue],
  [TypeType.IRIType, parserFor.IRIValue],
  [TypeType.NullType, parserFor.NullValue],
  [TypeType.ObjectClassFieldType, parserFor.ObjectClassFieldValue],
  [TypeType.ObjectIdentifierType, parserFor.ObjectIdentifierValue],
  [TypeType.OctetStringType, parserFor.OctetStringValue],
  [TypeType.RealType, parserFor.RealValue],
  [TypeType.RelativeIRIType, parserFor.RelativeIRIValue],
  [TypeType.RelativeOIDType, parserFor.RelativeOIDValue],
  [TypeType.SequenceType, parserFor.SequenceValue],
  [TypeType.SequenceOfType, parserFor.SequenceOfValue],
  [TypeType.SetType, parserFor.SetValue],
  [TypeType.SetOfType, parserFor.SetOfValue],
  [TypeType.TimeType, parserFor.TimeValue],
  [TypeType.TimeOfDayType, parserFor.TimeValue],
]);
