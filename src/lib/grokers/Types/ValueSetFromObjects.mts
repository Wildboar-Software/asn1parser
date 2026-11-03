import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import { type Type } from '../../constructs/Type.mjs';
import grokSomethingFromObject from '../SomethingFromObject.mjs';

export default function grok(cst: Production, ctx: GrokContext): Type {
  const base: number = ctx.textStartsAtOffset ?? 0;
  return {
    text: ctx.text.slice(cst.location.startIndex - base, cst.location.endIndex - base),
    typeType: TypeType.ValueSetFromObjects,
    type: grokSomethingFromObject(cst, ctx),
  };
}
