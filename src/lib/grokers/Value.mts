import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type Value } from '../constructs/Value.js';
import ValueType from '../constructs/ValueType.js';
import grokAnyValue from './Values/AnyValue.js';
import grokBitStringValue from './Values/BitStringValue.js';
import grokCharacterStringValue from './Values/CharacterStringValue.js';
import grokChoiceValue from './Values/ChoiceValue.js';
import grokIntegerValue from './Values/IntegerValue.js';
import grokObjectIdentifierValue from './Values/ObjectIdentifierValue.js';
import grokOctetStringValue from './Values/OctetStringValue.js';
import grokRealValue from './Values/RealValue.js';
import grokRelativeOIDValue from './Values/RelativeOIDValue.js';
import grokSetOrSequenceOfValue from './Values/SetOrSequenceOfValue.js';
import grokSetOrSequenceValue from './Values/SetOrSequenceValue.js';
import grokValueFromObject from './Values/ValueFromObject.js';
import grokDefined from './Defined.js';
import grokFixedTypeFieldVal from './Values/FixedTypeFieldVal.js';
import grokOpenTypeFieldVal from './Values/OpenTypeFieldVal.js';
import grokPrefixedValue from './Values/PrefixedValue.js';

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
