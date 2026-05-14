import TypeType from '../constructs/TypeType.mjs';
import ValueType from '../constructs/ValueType.mjs';

/**
 * @summary A mapping of ASN.1 value types to their equivalent ASN.1 type types.
 * @constant
 */
export default new Map<TypeType, ValueType>([
  [TypeType.BitStringType, ValueType.BitStringValue],
  [TypeType.BooleanType, ValueType.BooleanValue],
  [TypeType.ChoiceType, ValueType.ChoiceValue],
  [TypeType.EmbeddedPDVType, ValueType.EmbeddedPDVValue],
  [TypeType.EnumeratedType, ValueType.EnumeratedValue],
  [TypeType.ExternalType, ValueType.ExternalValue],
  [TypeType.IRIType, ValueType.IRIValue],
  [TypeType.InstanceOfType, ValueType.InstanceOfValue],
  [TypeType.IntegerType, ValueType.IntegerValue],
  [TypeType.NullType, ValueType.NullValue],
  [TypeType.ObjectIdentifierType, ValueType.ObjectIdentifierValue],
  [TypeType.OctetStringType, ValueType.OctetStringValue],
  [TypeType.RealType, ValueType.RealValue],
  [TypeType.RelativeIRIType, ValueType.RelativeIRIValue],
  [TypeType.RelativeOIDType, ValueType.RelativeOIDValue],
  [TypeType.SequenceOfType, ValueType.SequenceOfValue],
  [TypeType.SequenceType, ValueType.SequenceValue],
  [TypeType.SetOfType, ValueType.SetOfValue],
  [TypeType.SetType, ValueType.SetValue],
]);
