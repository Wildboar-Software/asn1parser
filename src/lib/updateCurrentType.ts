import ProductionType from './ProductionType.js';
import type ParseContext from './interfaces/ParseContext.js';
import productionTypeToTypeTypeMap from './maps/productionTypeToTypeTypeMap.js';

/**
 * @summary A callback to update the current type to be parsed.
 * @description
 * A callback to be used in `Parser` to update the current type so that
 * subsequent values can be parsed unambiguously.
 * @param {ParseContext} ctx The parser state to be updated
 * @function
 */
export default function updateCurrentType(ctx: ParseContext): void {
  const Type = ctx.cst;
  if (!Type || Type.children[0]?.type !== ProductionType.BuiltinType) {
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
      break;
    }
    const innerBuiltinType = TypeAfterPrefix.children[0];
    innerType = innerBuiltinType.children[0];
  }
  ctx.currentType = productionTypeToTypeTypeMap.get(innerType.type);
}
