import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type Value } from '../constructs/Value.mjs';
import ValueType from '../constructs/ValueType.mjs';
import grokAnyValue from './Values/AnyValue.mjs';
import grokBitStringValue from './Values/BitStringValue.mjs';
import grokCharacterStringValue from './Values/CharacterStringValue.mjs';
import grokChoiceValue from './Values/ChoiceValue.mjs';
import grokIntegerValue from './Values/IntegerValue.mjs';
import grokObjectIdentifierValue from './Values/ObjectIdentifierValue.mjs';
import grokOctetStringValue from './Values/OctetStringValue.mjs';
import grokRealValue from './Values/RealValue.mjs';
import grokRelativeOIDValue from './Values/RelativeOIDValue.mjs';
import grokSetOrSequenceOfValue from './Values/SetOrSequenceOfValue.mjs';
import grokSetOrSequenceValue from './Values/SetOrSequenceValue.mjs';
import grokValueFromObject from './Values/ValueFromObject.mjs';
import grokDefined from './Defined.mjs';
import grokFixedTypeFieldVal from './Values/FixedTypeFieldVal.mjs';
import grokOpenTypeFieldVal from './Values/OpenTypeFieldVal.mjs';
import grokPrefixedValue from './Values/PrefixedValue.mjs';

// Value ::=
//     BuiltinValue
// 	| ReferencedValue
// 	| ObjectClassFieldValue

// BuiltinValue ::=
//     BitStringValue
// 	| BooleanValue
// 	| CharacterStringValue
// 	| ChoiceValue
// 	| EmbeddedPDVValue
// 	| EnumeratedValue
// 	| ExternalValue
// 	| InstanceOfValue
// 	| IntegerValue
// 	| IRIValue
// 	| NullValue
// 	| ObjectIdentifierValue
// 	| OctetStringValue
// 	| RealValue
// 	| RelativeIRIValue
// 	| RelativeOIDValue
// 	| SequenceValue
// 	| SequenceOfValue
// 	| SetValue
// 	| SetOfValue
// 	| PrefixedValue
// 	| TimeValue

// ReferencedValue ::=
//     DefinedValue
// 	| ValueFromObject

// ObjectClassFieldValue ::=
//     OpenTypeFieldVal
//     | FixedTypeFieldVal

export default function grokValue(cst: Production, ctx: GrokContext): Value {
  const subtypeAST: Production = cst.children[0]; // Either BuiltinValue, ReferencedValue, ObjectClassFieldValue.
  const subsubtypeAST: Production = subtypeAST.children[0];
  const text = ctx.text.slice(
    subsubtypeAST.location.startIndex,
    subsubtypeAST.location.endIndex
  );
  switch (subsubtypeAST.type) {
    case ProductionType.BitStringValue: {
      return {
        text,
        valueType: ValueType.BitStringValue,
        value: grokBitStringValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.BooleanValue: {
      return {
        text,
        valueType: ValueType.BooleanValue,
        value: text === 'TRUE',
      };
    }
    case ProductionType.CharacterStringValue: {
      return {
        text,
        valueType: ValueType.CharacterStringValue,
        value: grokCharacterStringValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.ChoiceValue: {
      return {
        text,
        valueType: ValueType.ChoiceValue,
        value: grokChoiceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.IntegerValue: {
      return {
        text,
        valueType: ValueType.IntegerValue,
        value: grokIntegerValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.NullValue: {
      return {
        text,
        valueType: ValueType.NullValue,
        value: null,
      };
    }
    case ProductionType.ObjectIdentifierValue: {
      return {
        text,
        valueType: ValueType.ObjectIdentifierValue,
        value: grokObjectIdentifierValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.OctetStringValue: {
      return {
        text,
        valueType: ValueType.OctetStringValue,
        value: grokOctetStringValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.RealValue: {
      return {
        text,
        valueType: ValueType.RealValue,
        value: grokRealValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.RelativeOIDValue: {
      return {
        text,
        valueType: ValueType.RelativeOIDValue,
        value: grokRelativeOIDValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.SetOfValue: {
      return {
        text,
        valueType: ValueType.SetOfValue,
        value: grokSetOrSequenceOfValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.SequenceOfValue: {
      return {
        text,
        valueType: ValueType.SequenceOfValue,
        value: grokSetOrSequenceOfValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.SetValue: {
      return {
        text,
        valueType: ValueType.SetValue,
        value: grokSetOrSequenceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.SequenceValue: {
      return {
        text,
        valueType: ValueType.SequenceValue,
        value: grokSetOrSequenceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.InstanceOfValue:
    case ProductionType.EmbeddedPDVValue: {
      return {
        text,
        valueType: ValueType.EmbeddedPDVValue,
        value: grokSetOrSequenceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.ExternalValue: {
      return {
        text,
        valueType: ValueType.ExternalValue,
        value: grokSetOrSequenceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.DefinedValue: {
      return {
        text,
        valueType: ValueType.DefinedValue,
        value: grokDefined(subsubtypeAST, ctx),
      };
    }
    case ProductionType.ValueFromObject: {
      return {
        text,
        valueType: ValueType.ValueFromObject,
        value: grokValueFromObject(subsubtypeAST, ctx),
      };
    }
    case ProductionType.FixedTypeFieldVal: {
      return {
        text,
        valueType: ValueType.FixedTypeFieldVal,
        value: grokFixedTypeFieldVal(subsubtypeAST, ctx),
      };
    }
    case ProductionType.OpenTypeFieldVal: {
      return {
        text,
        valueType: ValueType.OpenTypeFieldVal,
        value: grokOpenTypeFieldVal(subsubtypeAST, ctx),
      };
    }
    case ProductionType.PrefixedValue: {
      return {
        text,
        valueType: ValueType.PrefixedValue,
        value: grokPrefixedValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.AnyValue: {
      // This should never actually happen.
      return {
        text,
        valueType: ValueType.AnyValue,
        value: grokAnyValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.EnumeratedValue: {
      return {
        text,
        valueType: ValueType.EnumeratedValue,
        value: {
          identifier: text,
        },
      };
    }
    default: {
      return {
        text,
        valueType: subsubtypeAST.type as unknown as ValueType,
        value: text,
      } as Value;
    }
  }
}
