import ProductionType from '../ProductionType.js';
import TypeType from '../constructs/TypeType.js';

/**
 * @summary A mapping of production types to ASN.1 data types.
 * @constant
 */
export default new Map<ProductionType, TypeType>([
  [ProductionType.BitStringType, TypeType.BitStringType],
  [ProductionType.BooleanType, TypeType.BooleanType],
  // [ ProductionType.CharacterStringType, TypeType.CharacterStringType ],
  [ProductionType.ChoiceType, TypeType.ChoiceType],
  [ProductionType.DateType, TypeType.DateType],
  [ProductionType.DateTimeType, TypeType.DateTimeType],
  [ProductionType.DurationType, TypeType.DurationType],
  [ProductionType.EmbeddedPDVType, TypeType.EmbeddedPDVType],
  [ProductionType.EnumeratedType, TypeType.EnumeratedType],
  [ProductionType.ExternalType, TypeType.ExternalType],
  [ProductionType.InstanceOfType, TypeType.InstanceOfType],
  [ProductionType.IntegerType, TypeType.IntegerType],
  [ProductionType.IRIType, TypeType.IRIType],
  [ProductionType.NullType, TypeType.NullType],
  [ProductionType.ObjectClassFieldType, TypeType.ObjectClassFieldType],
  [ProductionType.ObjectIdentifierType, TypeType.ObjectIdentifierType],
  [ProductionType.OctetStringType, TypeType.OctetStringType],
  [ProductionType.RealType, TypeType.RealType],
  [ProductionType.RelativeIRIType, TypeType.RelativeIRIType],
  [ProductionType.RelativeOIDType, TypeType.RelativeOIDType],
  [ProductionType.SequenceType, TypeType.SequenceType],
  [ProductionType.SequenceOfType, TypeType.SequenceOfType],
  [ProductionType.SetType, TypeType.SetType],
  [ProductionType.SetOfType, TypeType.SetOfType],
  [ProductionType.PrefixedType, TypeType.PrefixedType],
  [ProductionType.TimeType, TypeType.TimeType],
  [ProductionType.TimeOfDayType, TypeType.TimeOfDayType],
]);
