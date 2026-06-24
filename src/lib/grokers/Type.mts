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
import ASN1SyntaxError from '../errors/ASN1SyntaxError.mjs';

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
  const base = ctx.textStartsAtOffset ?? 0;
  const subsubtext = text.slice(
    subsubtypeAST.location.startIndex - base,
    subsubtypeAST.location.endIndex - base,
  );
  switch (subsubtypeAST.type) {
    case ProductionType.BitStringType: {
      return grokBitStringType(subsubtypeAST, ctx);
    }
    case ProductionType.AnyType: {
      return grokAnyType(subsubtypeAST, ctx);
    }
    case ProductionType.BooleanType: {
      return {
        text: subsubtext,
        typeType: TypeType.BooleanType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.CharacterStringType: {
      const c: Production = subsubtypeAST.children[0];
      if (c.type === ProductionType.UnrestrictedCharacterStringType) {
        return {
          text: subsubtext,
          typeType: TypeType.UnrestrictedCharacterStringType,
          type: subsubtext,
          ...grokedThing,
        };
      } else {
        const cc: Production = c.children[0];
        return {
          text: subsubtext,
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
          type: subsubtext,
          ...grokedThing,
        };
      }
    }
    case ProductionType.ChoiceType: {
      return grokChoiceType(subsubtypeAST, ctx);
    }
    case ProductionType.DateType: {
      return {
        text: subsubtext,
        typeType: TypeType.DateType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.DateTimeType: {
      return {
        text: subsubtext,
        typeType: TypeType.DateTimeType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.DurationType: {
      return {
        text: subsubtext,
        typeType: TypeType.DurationType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.EmbeddedPDVType: {
      return {
        text: subsubtext,
        typeType: TypeType.EmbeddedPDVType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.EnumeratedType: {
      return grokEnumeratedType(subsubtypeAST, ctx);
    }
    case ProductionType.ExternalType: {
      return {
        text: subsubtext,
        typeType: TypeType.ExternalType,
        type: subsubtext,
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
        text: subsubtext,
        typeType: TypeType.IRIType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.NullType: {
      return {
        text: subsubtext,
        typeType: TypeType.NullType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.ObjectClassFieldType: {
      return grokObjectClassFieldType(subsubtypeAST, ctx);
    }
    case ProductionType.ObjectIdentifierType: {
      return {
        text: subsubtext,
        typeType: TypeType.ObjectIdentifierType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.OctetStringType: {
      return {
        text: subsubtext,
        typeType: TypeType.OctetStringType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.RealType: {
      return {
        text: subsubtext,
        typeType: TypeType.RealType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.RelativeIRIType: {
      return {
        text: subsubtext,
        typeType: TypeType.RelativeIRIType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.RelativeOIDType: {
      return {
        text: subsubtext,
        typeType: TypeType.RelativeOIDType,
        type: subsubtext,
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
        text: subsubtext,
        typeType: TypeType.TimeType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.TimeOfDayType: {
      return {
        text: subsubtext,
        typeType: TypeType.TimeOfDayType,
        type: subsubtext,
        ...grokedThing,
      };
    }
    case ProductionType.DefinedType: {
      return {
        text: subsubtext,
        typeType: TypeType.DefinedType,
        type: grokDefined(subsubtypeAST, ctx),
        ...grokedThing,
      };
    }
    case ProductionType.UsefulType: {
      switch (subsubtypeAST.children[0].type) {
        case ProductionType._ObjectDescriptor: {
          return {
            text: subsubtext,
            typeType: TypeType.ObjectDescriptor,
            type: subsubtext,
            ...grokedThing,
          };
        }
        case ProductionType._UTCTime: {
          return {
            text: subsubtext,
            typeType: TypeType.UTCTime,
            type: subsubtext,
            ...grokedThing,
          };
        }
        case ProductionType._GeneralizedTime: {
          return {
            text: subsubtext,
            typeType: TypeType.GeneralizedTime,
            type: subsubtext,
            ...grokedThing,
          };
        }
        default: {
          throw new ASN1SyntaxError(
            subsubtypeAST,
            `Unrecognized child production of UsefulType '${subsubtypeAST.children[0].type}'.`,
            ctx.currentModule.name,
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
        text: subsubtext,
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
        type: subsubtext,
        ...grokedThing,
      };
    }
  }
}
