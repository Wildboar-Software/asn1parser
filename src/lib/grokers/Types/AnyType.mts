import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import type AnyType from '../../constructs/Types/AnyType.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import { type Type } from '../../constructs/Type.mjs';

/**
 * `AnyType ::= ANY | ANY DEFINED BY identifier`
 */

export default function grok(cst: Production, ctx: GrokContext): Type {
  const text: string = ctx.text;
  const last: Production = cst.children[cst.children.length - 1];
  return {
    text: text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType: TypeType.AnyType,
    type:
      cst.children.length === 1
        ? ({} as AnyType)
        : {
            definedBy: text.slice(
              last.location.startIndex,
              last.location.endIndex
            ),
          },
    production: cst,
  };
}
