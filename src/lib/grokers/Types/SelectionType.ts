import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import { type Type } from '../../constructs/Type.js';
import TypeType from '../../constructs/TypeType.js';
import grokType from '../Type.js';

// SelectionType ::= identifier "<" Type

export default function grok(cst: Production, ctx: GrokContext): Type {
  const text: string = ctx.text;
  return {
    text: text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType: TypeType.SelectionType,
    type: {
      identifier: text.slice(
        cst.children[0].location.startIndex,
        cst.children[0].location.endIndex
      ),
      type: grokType(cst.children[cst.children.length - 1], ctx),
    },
  };
}
