import TypeType from '../constructs/TypeType.js';
import ValueType from '../constructs/ValueType.js';

/**
 * @summary A mapping of ASN.1 value types to their equivalent ASN.1 type types.
 * @constant
 */
export default new Map<ValueType, TypeType>([
  [ValueType.BitStringValue, TypeType.BitStringType],
  [ValueType.BooleanValue, TypeType.BooleanType],
  // [ ValueType.CharacterStringValue , TypeType.Ch ],
  [ValueType.ChoiceValue, TypeType.ChoiceType],
  // [ ValueType.DefinedValue , TypeType.DefinedType ],
  [ValueType.EmbeddedPDVValue, TypeType.EmbeddedPDVType],
  [ValueType.EnumeratedValue, TypeType.EnumeratedType],
  [ValueType.ExternalValue, TypeType.ExternalType],
  [ValueType.IRIValue, TypeType.IRIType],
  [ValueType.InstanceOfValue, TypeType.InstanceOfType],
  [ValueType.IntegerValue, TypeType.IntegerType],
  [ValueType.NullValue, TypeType.NullType],
  [ValueType.ObjectIdentifierValue, TypeType.ObjectIdentifierType],
  [ValueType.OctetStringValue, TypeType.OctetStringType],
  [ValueType.RealValue, TypeType.RealType],
  [ValueType.RelativeIRIValue, TypeType.RelativeIRIType],
  [ValueType.RelativeOIDValue, TypeType.RelativeOIDType],
  [ValueType.SequenceOfValue, TypeType.SequenceOfType],
  [ValueType.SequenceValue, TypeType.SequenceType],
  [ValueType.SetOfValue, TypeType.SetOfType],
  [ValueType.SetValue, TypeType.SetType],
]);
