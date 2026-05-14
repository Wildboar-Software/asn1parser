import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type PrefixedValue } from '../../constructs/Values/PrefixedValue.mjs';
import grokValue from '../Value.mjs';

// PrefixedValue ::= Value
export default function grok(cst: Production, ctx: GrokContext): PrefixedValue {
  return grokValue(cst.children[0], ctx);
}
