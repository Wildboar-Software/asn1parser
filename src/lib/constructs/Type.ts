import type GrokedThing from '../interfaces/GrokedThing.js';
import type Constraint from './Constraint.js';
import type Tagging from './Tagging.js';
import * as types from '../constructs/Types/index.js';
import TypeType from './TypeType.js';
import type Defined from '../constructs/Defined.js';

interface CommonType extends GrokedThing {
  tagging?: Tagging;
  constraints?: Constraint[];
}

interface BooleanType extends CommonType {
  typeType: TypeType.BooleanType;
  type: string;
}

interface BitStringType extends CommonType {
  typeType: TypeType.BitStringType;
  type: types.BitStringType;
}

interface IntegerType extends CommonType {
  typeType: TypeType.IntegerType;
  type: types.IntegerType;
}

interface OctetStringType extends CommonType {
  typeType: TypeType.OctetStringType;
  type: string;
}

interface NullType extends CommonType {
  typeType: TypeType.NullType;
  type: string;
}

interface ObjectIdentifierType extends CommonType {
  typeType: TypeType.ObjectIdentifierType;
  type: string;
}

interface ExternalType extends CommonType {
  typeType: TypeType.ExternalType;
  type: string;
}

interface InstanceOfType extends CommonType {
  typeType: TypeType.InstanceOfType;
  type: types.InstanceOfType;
}

interface RealType extends CommonType {
  typeType: TypeType.RealType;
  type: string;
}

interface EnumeratedType extends CommonType {
  typeType: TypeType.EnumeratedType;
  type: types.EnumeratedType;
}

interface EmbeddedPDVType extends CommonType {
  typeType: TypeType.EmbeddedPDVType;
  type: string;
}

interface SequenceType extends CommonType {
  typeType: TypeType.SequenceType;
  type: types.SetOrSequenceType;
}

interface SetType extends CommonType {
  typeType: TypeType.SetType;
  type: types.SetOrSequenceType;
}

interface SequenceOfType extends CommonType {
  typeType: TypeType.SequenceOfType;
  type: types.SetOrSequenceOfType;
}

interface SetOfType extends CommonType {
  typeType: TypeType.SetOfType;
  type: types.SetOrSequenceOfType;
}

interface UnrestrictedCharacterStringType extends CommonType {
  typeType: TypeType.UnrestrictedCharacterStringType; // CHARACTER STRING
  type: string;
}

interface ChoiceType extends CommonType {
  typeType: TypeType.ChoiceType;
  type: types.ChoiceType;
}

interface DefinedType extends CommonType {
  typeType: TypeType.DefinedType;
  type: Defined;
}

interface ObjectClassFieldType extends CommonType {
  typeType: TypeType.ObjectClassFieldType;
  type: types.ObjectClassFieldType;
}

// Cannot be used in its own definition, because it is recursive.
// interface PrefixedType extends CommonType {
//     typeType: TypeType.PrefixedType;
//     type: Type;
// }

interface SelectionType extends CommonType {
  typeType: TypeType.SelectionType;
  type: types.SelectionType;
}

interface AnyType extends CommonType {
  typeType: TypeType.AnyType;
  type: types.AnyType;
}

interface TypeFromObject extends CommonType {
  typeType: TypeType.TypeFromObject;
  type: types.TypeFromObject;
}

interface ValueSetFromObjects extends CommonType {
  typeType: TypeType.ValueSetFromObjects;
  type: types.ValueSetFromObjects;
}

// Every Other Type

interface ObjectDescriptorType extends CommonType {
  typeType: TypeType.ObjectDescriptor;
  type: string;
}

interface UTF8StringType extends CommonType {
  typeType: TypeType.UTF8String;
  type: string;
}

interface NumericStringType extends CommonType {
  typeType: TypeType.NumericString;
  type: string;
}

interface PrintableStringType extends CommonType {
  typeType: TypeType.PrintableString;
  type: string;
}

interface TeletexStringType extends CommonType {
  typeType: TypeType.TeletexString;
  type: string;
}

interface T61StringType extends CommonType {
  typeType: TypeType.T61String;
  type: string;
}

interface VideotexStringType extends CommonType {
  typeType: TypeType.VideotexString;
  type: string;
}

interface IA5StringType extends CommonType {
  typeType: TypeType.IA5String;
  type: string;
}

interface UTCTimeType extends CommonType {
  typeType: TypeType.UTCTime;
  type: string;
}

interface GeneralizedTimeType extends CommonType {
  typeType: TypeType.GeneralizedTime;
  type: string;
}

interface GraphicStringType extends CommonType {
  typeType: TypeType.GraphicString;
  type: string;
}

interface VisibleStringType extends CommonType {
  typeType: TypeType.VisibleString;
  type: string;
}

interface ISO646StringType extends CommonType {
  typeType: TypeType.ISO646String;
  type: string;
}

interface GeneralStringType extends CommonType {
  typeType: TypeType.GeneralString;
  type: string;
}

interface UniversalStringType extends CommonType {
  typeType: TypeType.UniversalString;
  type: string;
}

interface BMPStringType extends CommonType {
  typeType: TypeType.BMPString;
  type: string;
}

interface DateTimeTypeType extends CommonType {
  typeType: TypeType.DateTimeType;
  type: string;
}

interface DateTypeType extends CommonType {
  typeType: TypeType.DateType;
  type: string;
}

interface DurationTypeType extends CommonType {
  typeType: TypeType.DurationType;
  type: string;
}

interface TimeOfDayTypeType extends CommonType {
  typeType: TypeType.TimeOfDayType;
  type: string;
}

interface TimeTypeType extends CommonType {
  typeType: TypeType.TimeType;
  type: string;
}

interface IRITypeType extends CommonType {
  typeType: TypeType.IRIType;
  type: string;
}

interface RelativeIRITypeType extends CommonType {
  typeType: TypeType.RelativeIRIType;
  type: string;
}

interface RelativeOIDTypeType extends CommonType {
  typeType: TypeType.RelativeOIDType;
  type: string;
}

export type EveryOtherType =
  | ObjectDescriptorType
  | UTF8StringType
  | NumericStringType
  | PrintableStringType
  | TeletexStringType
  | T61StringType
  | VideotexStringType
  | IA5StringType
  | UTCTimeType
  | GeneralizedTimeType
  | GraphicStringType
  | VisibleStringType
  | ISO646StringType
  | GeneralStringType
  | UniversalStringType
  | BMPStringType
  | DateTimeTypeType
  | DateTypeType
  | DurationTypeType
  | TimeOfDayTypeType
  | TimeTypeType
  | IRITypeType
  | RelativeIRITypeType
  | RelativeOIDTypeType;

export type Type =
  | AnyType
  | BitStringType
  | BooleanType
  | ChoiceType
  | DefinedType
  | EmbeddedPDVType
  | EnumeratedType
  | EveryOtherType
  | ExternalType
  | InstanceOfType
  | IntegerType
  | NullType
  | ObjectClassFieldType
  | ObjectIdentifierType
  | OctetStringType
  // | PrefixedType
  | RealType
  | SelectionType
  | SequenceOfType
  | SequenceType
  | SetOfType
  | SetType
  | TypeFromObject
  | UnrestrictedCharacterStringType
  | ValueSetFromObjects
  | {
      // This has to be here, because it is recursive.
      tagging?: Tagging;
      constraints?: Constraint[];
      typeType: TypeType.PrefixedType;
      type: Type;
    };
