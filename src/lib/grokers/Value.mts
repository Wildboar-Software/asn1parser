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
import type GrokedThing from '../interfaces/GrokedThing.mjs';

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
  const base: number = ctx.textStartsAtOffset ?? 0;
  const text = ctx.text.slice(
    subsubtypeAST.location.startIndex - base,
    subsubtypeAST.location.endIndex - base,
  );
  const grokedThing = {
    text,
    production: subsubtypeAST,
    productionType: subsubtypeAST.type,
  } satisfies GrokedThing;
  switch (subsubtypeAST.type) {
    case ProductionType.BitStringValue: {
      return {
        ...grokedThing,
        valueType: ValueType.BitStringValue,
        value: grokBitStringValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.BooleanValue: {
      return {
        ...grokedThing,
        valueType: ValueType.BooleanValue,
        value: text === 'TRUE',
      };
    }
    case ProductionType.CharacterStringValue: {
      return {
        ...grokedThing,
        valueType: ValueType.CharacterStringValue,
        value: grokCharacterStringValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.ChoiceValue: {
      return {
        ...grokedThing,
        valueType: ValueType.ChoiceValue,
        value: grokChoiceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.IntegerValue: {
      return {
        ...grokedThing,
        valueType: ValueType.IntegerValue,
        value: grokIntegerValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.NullValue: {
      return {
        ...grokedThing,
        valueType: ValueType.NullValue,
        value: null,
      };
    }
    case ProductionType.ObjectIdentifierValue: {
      return {
        ...grokedThing,
        valueType: ValueType.ObjectIdentifierValue,
        value: grokObjectIdentifierValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.OctetStringValue: {
      return {
        ...grokedThing,
        valueType: ValueType.OctetStringValue,
        value: grokOctetStringValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.RealValue: {
      return {
        ...grokedThing,
        valueType: ValueType.RealValue,
        value: grokRealValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.RelativeOIDValue: {
      return {
        ...grokedThing,
        valueType: ValueType.RelativeOIDValue,
        value: grokRelativeOIDValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.SetOfValue: {
      return {
        ...grokedThing,
        valueType: ValueType.SetOfValue,
        value: grokSetOrSequenceOfValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.SequenceOfValue: {
      return {
        ...grokedThing,
        valueType: ValueType.SequenceOfValue,
        value: grokSetOrSequenceOfValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.SetValue: {
      return {
        ...grokedThing,
        valueType: ValueType.SetValue,
        value: grokSetOrSequenceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.SequenceValue: {
      return {
        ...grokedThing,
        valueType: ValueType.SequenceValue,
        value: grokSetOrSequenceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.InstanceOfValue:
    case ProductionType.EmbeddedPDVValue: {
      return {
        ...grokedThing,
        valueType: ValueType.EmbeddedPDVValue,
        value: grokSetOrSequenceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.ExternalValue: {
      return {
        ...grokedThing,
        valueType: ValueType.ExternalValue,
        value: grokSetOrSequenceValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.DefinedValue: {
      return {
        ...grokedThing,
        valueType: ValueType.DefinedValue,
        value: grokDefined(subsubtypeAST, ctx),
      };
    }
    case ProductionType.ValueFromObject: {
      return {
        ...grokedThing,
        valueType: ValueType.ValueFromObject,
        value: grokValueFromObject(subsubtypeAST, ctx),
      };
    }
    case ProductionType.FixedTypeFieldVal: {
      return {
        ...grokedThing,
        valueType: ValueType.FixedTypeFieldVal,
        value: grokFixedTypeFieldVal(subsubtypeAST, ctx),
      };
    }
    case ProductionType.OpenTypeFieldVal: {
      return {
        ...grokedThing,
        valueType: ValueType.OpenTypeFieldVal,
        value: grokOpenTypeFieldVal(subsubtypeAST, ctx),
      };
    }
    case ProductionType.PrefixedValue: {
      return {
        ...grokedThing,
        valueType: ValueType.PrefixedValue,
        value: grokPrefixedValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.AnyValue: {
      // This should never actually happen.
      return {
        ...grokedThing,
        valueType: ValueType.AnyValue,
        value: grokAnyValue(subsubtypeAST, ctx),
      };
    }
    case ProductionType.EnumeratedValue: {
      return {
        ...grokedThing,
        valueType: ValueType.EnumeratedValue,
        value: {
          identifier: text,
        },
      };
    }
    default: {
      return {
        ...grokedThing,
        valueType: subsubtypeAST.type as unknown as ValueType,
        value: text,
      } as Value;
    }
  }
}
