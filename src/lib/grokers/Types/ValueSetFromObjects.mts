import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import { type Type } from '../../constructs/Type.mjs';
import grokSomethingFromObject from '../SomethingFromObject.mjs';

export default function grok(cst: Production, ctx: GrokContext): Type {
  return {
    text: ctx.text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType: TypeType.ValueSetFromObjects,
    type: grokSomethingFromObject(cst, ctx),
  };
}
