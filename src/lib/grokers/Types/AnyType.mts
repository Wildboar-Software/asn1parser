import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import type AnyType from '../../constructs/Types/AnyType.js';
import TypeType from '../../constructs/TypeType.js';
import { type Type } from '../../constructs/Type.js';

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
  };
}
