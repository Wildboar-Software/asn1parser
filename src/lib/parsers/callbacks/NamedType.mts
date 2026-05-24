import type ParseContext from '../../interfaces/ParseContext.mjs';
import ProductionType from '../../ProductionType.mjs';
import productionTypeToTypeTypeMap from '../../maps/productionTypeToTypeTypeMap.mjs';

// NamedType ::= identifier Type

// Type ::=
//     BuiltinType
// 	| ReferencedType
// 	| ConstrainedType

// BuiltinType ::=
//    BitStringType
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
// 	| OctetStringTypea
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

// PrefixedType ::=
//     TaggedType
//     | EncodingPrefixedType

// EncodingPrefixedType ::=
//     EncodingPrefix Type

// EncodingPrefix ::=
// 	"[" EncodingReference EncodingInstruction "]"

// TaggedType ::=
// 	Tag Type
// 	| Tag IMPLICIT Type
// 	| Tag EXPLICIT Type

// Tag ::=
// 	"[" EncodingReference Class ClassNumber "]"

/**
 * @summary The callback called upon parsing a `NamedType`
 * @description
 * This callback sets the `currentType` based on the type parsed from a
 * component's `NamedType`, so that the following value can be parsed according
 * to its type.
 * @param {ParseContext} ctx The parser state
 * @function
 */
export const onDidParseNamedType = function onDidParseNamedType(ctx: ParseContext): void {
  const Type = ctx.cst.children[ctx.cst.children.length - 1];
  if (Type.children[0].type !== ProductionType.BuiltinType) {
    ctx.currentType = undefined;
    return;
  }
  const BuiltinType = Type.children[0];
  let innerType = BuiltinType.children[0];
  while (innerType.type === ProductionType.PrefixedType) {
    const TaggedOrEncodingPrefixedType = innerType.children[0];
    const TypeAfterPrefix =
      TaggedOrEncodingPrefixedType.children[
        TaggedOrEncodingPrefixedType.children.length - 1
      ];
    if (TypeAfterPrefix.children[0].type !== ProductionType.BuiltinType) {
      ctx.currentType = undefined;
      return;
    }
    const innerBuiltinType = TypeAfterPrefix.children[0];
    innerType = innerBuiltinType.children[0];
  }
  ctx.currentType = productionTypeToTypeTypeMap.get(innerType.type);
};
export default onDidParseNamedType;
