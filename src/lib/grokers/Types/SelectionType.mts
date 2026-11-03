import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type Type } from '../../constructs/Type.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import grokType from '../Type.mjs';

// SelectionType ::= identifier "<" Type

export default function grok(cst: Production, ctx: GrokContext): Type {
  const base: number = ctx.textStartsAtOffset ?? 0;
  const text: string = ctx.text;
  return {
    text: text.slice(cst.location.startIndex - base, cst.location.endIndex - base),
    typeType: TypeType.SelectionType,
    type: {
      identifier: text.slice(
        cst.children[0].location.startIndex - base,
        cst.children[0].location.endIndex - base
      ),
      type: grokType(cst.children[cst.children.length - 1], ctx),
    },
    production: cst,
  };
}
