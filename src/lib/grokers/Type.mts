import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type Type } from '../constructs/Type.mjs';
import TypeType from '../constructs/TypeType.mjs';
import grokAnyType from './Types/AnyType.mjs';
import grokBitStringType from './Types/BitStringType.mjs';
import grokChoiceType from './Types/ChoiceType.mjs';
import grokEnumeratedType from './Types/EnumeratedType.mjs';
import grokInstanceOfType from './Types/InstanceOfType.mjs';
import grokIntegerType from './Types/IntegerType.mjs';
import grokObjectClassFieldType from './Types/ObjectClassFieldType.mjs';
import grokPrefixedType from './Types/PrefixedType.mjs';
import grokSetOrSequenceOfType from './Types/SetOrSequenceOfType.mjs';
import grokSetOrSequenceType from './Types/SetOrSequenceType.mjs';
import grokDefined from './Defined.mjs';
import grokConstrainedType from './Types/ConstrainedType.mjs';
import grokSelectionType from './Types/SelectionType.mjs';
import grokTypeFromObject from './Types/TypeFromObject.mjs';
import grokValueSetFromObjects from './Types/ValueSetFromObjects.mjs';
import type GrokedThing from '../interfaces/GrokedThing.mjs';

// Type ::=
//     BuiltinType
// 	| ReferencedType
// 	| ConstrainedType

// BuiltinType ::=
//     BitStringType
// 	| BooleanType
// 	| CharacterStringType
// 	| ChoiceType
// 	| DateType
// 	| DateTimeType
// 	| DurationType
// 	| EmbeddedPDVType
// 	| EnumeratedType
// 	| ExternalType
// 	| InstanceOfType
// 	| IntegerType
// 	| IRIType
// 	| NullType
// 	| ObjectClassFieldType
// 	| ObjectIdentifierType
// 	| OctetStringType
// 	| RealType
// 	| RelativeIRIType
// 	| RelativeOIDType
// 	| SequenceType
// 	| SequenceOfType
// 	| SetType
// 	| SetOfType
// 	| PrefixedType
// 	| TimeType
// 	| TimeOfDayType

// ReferencedType ::=
//     DefinedType
// 	| UsefulType
// 	| SelectionType
// 	| TypeFromObject
// 	| ValueSetFromObjects

export default function grokType(cst: Production, ctx: GrokContext): Type {
  const text: string = ctx.text;
  const subtypeAST: Production = cst.children[0]; // Either BuiltinType, ReferencedType, ConstrainedType.
  if (subtypeAST.type === ProductionType.ConstrainedType) {
    return grokConstrainedType(subtypeAST, ctx);
  }
  const subsubtypeAST: Production = subtypeAST.children[0];
    const grokedThing = {
      production: subsubtypeAST,
      productionType: subsubtypeAST.type,
    } satisfies GrokedThing;
  switch (subsubtypeAST.type) {
    case ProductionType.BitStringType: {
      return grokBitStringType(subsubtypeAST, ctx);
    }
    case ProductionType.AnyType: {
      return grokAnyType(subsubtypeAST, ctx);
    }
    case ProductionType.BooleanType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.BooleanType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.CharacterStringType: {
      const c: Production = subsubtypeAST.children[0];
      if (c.type === ProductionType.UnrestrictedCharacterStringType) {
        return {
          text: text.slice(
            subsubtypeAST.location.startIndex,
            subsubtypeAST.location.endIndex
          ),
          typeType: TypeType.UnrestrictedCharacterStringType,
          type: text.slice(
            subsubtypeAST.location.startIndex,
            subsubtypeAST.location.endIndex
          ),
          ...grokedThing,
        };
      } else {
        const cc: Production = c.children[0];
        return {
          text: text.slice(
            subsubtypeAST.location.startIndex,
            subsubtypeAST.location.endIndex
          ),
          typeType: cc.type as unknown as
            | TypeType.BMPString
            | TypeType.GeneralString
            | TypeType.GraphicString
            | TypeType.IA5String
            | TypeType.ISO646String
            | TypeType.NumericString
            | TypeType.PrintableString
            | TypeType.TeletexString
            | TypeType.T61String
            | TypeType.UniversalString
            | TypeType.UTF8String
            | TypeType.VideotexString
            | TypeType.VisibleString,
          type: text.slice(
            subsubtypeAST.location.startIndex,
            subsubtypeAST.location.endIndex
          ),
          ...grokedThing,
        };
      }
    }
    case ProductionType.ChoiceType: {
      return grokChoiceType(subsubtypeAST, ctx);
    }
    case ProductionType.DateType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.DateType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.DateTimeType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.DateTimeType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.DurationType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.DurationType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.EmbeddedPDVType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.EmbeddedPDVType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.EnumeratedType: {
      return grokEnumeratedType(subsubtypeAST, ctx);
    }
    case ProductionType.ExternalType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.ExternalType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.InstanceOfType: {
      return grokInstanceOfType(subsubtypeAST, ctx);
    }
    case ProductionType.IntegerType: {
      return grokIntegerType(subsubtypeAST, ctx);
    }
    case ProductionType.IRIType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.IRIType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.NullType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.NullType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.ObjectClassFieldType: {
      return grokObjectClassFieldType(subsubtypeAST, ctx);
    }
    case ProductionType.ObjectIdentifierType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.ObjectIdentifierType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.OctetStringType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.OctetStringType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.RealType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.RealType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.RelativeIRIType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.RelativeIRIType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.RelativeOIDType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.RelativeOIDType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.SetOfType:
    case ProductionType.SequenceOfType: {
      return grokSetOrSequenceOfType(subsubtypeAST, ctx);
    }
    case ProductionType.SetType:
    case ProductionType.SequenceType: {
      return grokSetOrSequenceType(subsubtypeAST, ctx);
    }
    // PrefixedType will handle the tagging.
    case ProductionType.PrefixedType: {
      return grokPrefixedType(subsubtypeAST, ctx);
    }
    case ProductionType.TimeType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.TimeType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.TimeOfDayType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.TimeOfDayType,
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
    case ProductionType.DefinedType: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: TypeType.DefinedType,
        type: grokDefined(subsubtypeAST, ctx),
        ...grokedThing,
      };
    }
    case ProductionType.UsefulType: {
      switch (subsubtypeAST.children[0].type) {
        case ProductionType._ObjectDescriptor: {
          return {
            text: text.slice(
              subsubtypeAST.location.startIndex,
              subsubtypeAST.location.endIndex
            ),
            typeType: TypeType.ObjectDescriptor,
            type: text.slice(
              subsubtypeAST.location.startIndex,
              subsubtypeAST.location.endIndex
            ),
            ...grokedThing,
          };
        }
        case ProductionType._UTCTime: {
          return {
            text: text.slice(
              subsubtypeAST.location.startIndex,
              subsubtypeAST.location.endIndex
            ),
            typeType: TypeType.UTCTime,
            type: text.slice(
              subsubtypeAST.location.startIndex,
              subsubtypeAST.location.endIndex
            ),
            ...grokedThing,
          };
        }
        case ProductionType._GeneralizedTime: {
          return {
            text: text.slice(
              subsubtypeAST.location.startIndex,
              subsubtypeAST.location.endIndex
            ),
            typeType: TypeType.GeneralizedTime,
            type: text.slice(
              subsubtypeAST.location.startIndex,
              subsubtypeAST.location.endIndex
            ),
            ...grokedThing,
          };
        }
        default: {
          throw new Error(
            `Unrecognized child production of UsefulType '${subsubtypeAST.children[0].type}'.`
          );
        }
      }
    }
    case ProductionType.SelectionType: {
      return grokSelectionType(subsubtypeAST, ctx);
    }
    case ProductionType.TypeFromObject: {
      return grokTypeFromObject(subsubtypeAST, ctx);
    }
    case ProductionType.ValueSetFromObjects: {
      return grokValueSetFromObjects(subsubtypeAST, ctx);
    }
    default: {
      return {
        text: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        typeType: subsubtypeAST.type as unknown as
          | TypeType.ObjectDescriptor
          | TypeType.UTF8String
          | TypeType.NumericString
          | TypeType.PrintableString
          | TypeType.TeletexString
          | TypeType.T61String
          | TypeType.VideotexString
          | TypeType.IA5String
          | TypeType.UTCTime
          | TypeType.GeneralizedTime
          | TypeType.GraphicString
          | TypeType.VisibleString
          | TypeType.ISO646String
          | TypeType.GeneralString
          | TypeType.UniversalString
          | TypeType.BMPString
          | TypeType.DateTimeType
          | TypeType.DateType
          | TypeType.DurationType
          | TypeType.TimeOfDayType
          | TypeType.TimeType
          | TypeType.IRIType
          | TypeType.RelativeIRIType
          | TypeType.RelativeOIDType, // Mea culpa
        type: text.slice(
          subsubtypeAST.location.startIndex,
          subsubtypeAST.location.endIndex
        ),
        ...grokedThing,
      };
    }
  }
}
