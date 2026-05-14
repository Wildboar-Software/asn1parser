import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import TypeType from '../../constructs/TypeType.js';
import { type Type } from '../../constructs/Type.js';
import grokSomethingFromObject from '../SomethingFromObject.js';

export default function grok(cst: Production, ctx: GrokContext): Type {
  return {
    text: ctx.text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType: TypeType.ValueSetFromObjects,
    type: grokSomethingFromObject(cst, ctx),
  };
}
