import { type Type } from './constructs/Type.mjs';
import { type Value } from './constructs/Value.mjs';
import TypeType from './constructs/TypeType.mjs';
import valueTypeToTypeTypeMap from './maps/valueTypeToTypeTypeMap.mjs';
import ValueType from './constructs/ValueType.mjs';

/**
 * The types that could refer to any builtin type.
 */
const ambiguousTypeTypes = new Set([
  // ReferencedType
  TypeType.DefinedType,
  // TypeType.UsefulType,
  TypeType.SelectionType,
  TypeType.TypeFromObject,
  TypeType.ValueSetFromObjects,

  // BuiltinType
  TypeType.ObjectClassFieldType,
  TypeType.SelectionType,
]);

// TODO: Create an alternative version that resolves types and values.

/**
 * @summary Determine whether a type and value are type-compatible.
 * @description
 * Determines whether the given value is a valid value of the given type.
 * @param {Type} t The Type
 * @param {Value} v The Value
 * @returns {boolean} Whether the type and value are type-compatible.
 */
export default function isTypeCompatibleWithValue(t: Type, v: Value): boolean {
  /**
   * EnumeratedValue gets mistaken as a DefinedValue. Though it may be
   * possible in theory to use a defined value as an enumerated value, it is
   * almost never done. This will give a little pushback to reparse it as an
   * enumerated value.
   */
  if (
    t.typeType === TypeType.EnumeratedType &&
    v.valueType === ValueType.DefinedValue
  ) {
    return false;
  }
  if (ambiguousTypeTypes.has(t.typeType)) {
    return true;
  }
  if (t.typeType === TypeType.PrefixedType) {
    return isTypeCompatibleWithValue(t.type, v);
  }
  // Not doing this. We want the top-level CST production type to be RealValue.
  // if (
  //   t.typeType === TypeType.RealType
  //   && v.valueType === ValueType.SequenceValue
  //   && (v.value.length === 3)
  //   && v.value.some((c) => c.identifier === "mantissa")
  //   && v.value.some((c) => c.identifier === "exponent")
  //   && v.value.some((c) => c.identifier === "base")
  // ) {
  //   return true;
  // }
  const tt = valueTypeToTypeTypeMap.get(v.valueType);
  // It is better to default to `true` if we cannot determine the value's
  // type, since we should assume most of the ASN.1 is correct.
  return tt ? t.typeType === tt : true;
}
