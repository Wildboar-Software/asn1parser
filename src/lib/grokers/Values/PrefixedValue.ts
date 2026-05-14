import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import { type PrefixedValue } from '../../constructs/Values/PrefixedValue.js';
import grokValue from '../Value.js';

// PrefixedValue ::= Value
export default function grok(cst: Production, ctx: GrokContext): PrefixedValue {
  return grokValue(cst.children[0], ctx);
}
