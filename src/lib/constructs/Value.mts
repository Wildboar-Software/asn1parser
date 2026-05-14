import type GrokedThing from '../interfaces/GrokedThing.mjs';
import * as values from './Values/index.mjs';
import ValueType from './ValueType.mjs';
import type Defined from './Defined.mjs';

interface CommonValue extends GrokedThing {
  text: string;
}

interface DefinedValue extends CommonValue {
  valueType: ValueType.DefinedValue;
  value: Defined;
}

interface BooleanValue extends CommonValue {
  valueType: ValueType.BooleanValue;
  value: boolean;
}

interface IntegerValue extends CommonValue {
  valueType: ValueType.IntegerValue;
  value: values.IntegerValue;
}

interface BitStringValue extends CommonValue {
  valueType: ValueType.BitStringValue;
  value: values.BitStringValue;
}

interface OctetStringValue extends CommonValue {
  valueType: ValueType.OctetStringValue;
  value: values.OctetStringValue;
}

interface NullValue extends CommonValue {
  valueType: ValueType.NullValue;
  value: null;
}

interface ObjectIdentifierValue extends CommonValue {
  valueType: ValueType.ObjectIdentifierValue;
  value: values.ObjectIdentifierValue;
}

interface ExternalValue extends CommonValue {
  valueType: ValueType.ExternalValue;
  value: values.SetOrSequenceValue;
}

interface InstanceOfValue extends CommonValue {
  valueType: ValueType.InstanceOfValue;
  value: values.SetOrSequenceValue;
}

interface RealValue extends CommonValue {
  valueType: ValueType.RealValue;
  value: values.RealValue;
}

interface EnumeratedValue extends CommonValue {
  valueType: ValueType.EnumeratedValue;
  value: values.EnumeratedValue;
}

interface EmbeddedPDVValue extends CommonValue {
  valueType: ValueType.EmbeddedPDVValue;
  value: values.SetOrSequenceValue;
}

interface RelativeOIDValue extends CommonValue {
  valueType: ValueType.RelativeOIDValue;
  value: values.RelativeOIDValue;
}

interface SequenceValue extends CommonValue {
  valueType: ValueType.SequenceValue;
  value: values.SetOrSequenceValue;
}

interface SequenceOfValue extends CommonValue {
  valueType: ValueType.SequenceOfValue;
  value: values.SetOrSequenceOfValue;
}

interface SetValue extends CommonValue {
  valueType: ValueType.SetValue;
  value: values.SetOrSequenceValue;
}

interface SetOfValue extends CommonValue {
  valueType: ValueType.SetOfValue;
  value: values.SetOrSequenceOfValue;
}

interface ChoiceValue extends CommonValue {
  valueType: ValueType.ChoiceValue;
  value: values.ChoiceValue;
}

interface CharacterStringValue extends CommonValue {
  valueType: ValueType.CharacterStringValue;
  value: values.CharacterStringValue;
}

interface ValueFromObject extends CommonValue {
  valueType: ValueType.ValueFromObject;
  value: values.ValueFromObject;
}

interface FixedTypeFieldVal extends CommonValue {
  valueType: ValueType.FixedTypeFieldVal;
  value: values.FixedTypeFieldVal;
}

interface OpenTypeFieldVal extends CommonValue {
  valueType: ValueType.OpenTypeFieldVal;
  value: values.OpenTypeFieldVal;
}

interface PrefixedValue extends CommonValue {
  valueType: ValueType.PrefixedValue;
  value: values.PrefixedValue;
}

interface AnyValue extends CommonValue {
  valueType: ValueType.AnyValue;
  value: values.AnyValue;
}

interface EveryOtherValue extends CommonValue {
  valueType:
    | ValueType.IRIValue
    | ValueType.RelativeIRIValue
    | ValueType.TimeValue;
  value: string;
}

export type Value =
  | AnyValue
  | BitStringValue
  | BooleanValue
  | CharacterStringValue
  | ChoiceValue
  | DefinedValue
  | EmbeddedPDVValue
  | EnumeratedValue
  | EveryOtherValue
  | ExternalValue
  | FixedTypeFieldVal
  | InstanceOfValue
  | IntegerValue
  | NullValue
  | ObjectIdentifierValue
  | OctetStringValue
  | OpenTypeFieldVal
  | PrefixedValue
  | RealValue
  | RelativeOIDValue
  | SequenceOfValue
  | SequenceValue
  | SetOfValue
  | SetValue
  | ValueFromObject;
