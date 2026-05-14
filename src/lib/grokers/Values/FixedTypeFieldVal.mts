import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type FixedTypeFieldVal } from '../../constructs/Values/FixedTypeFieldVal.mjs';
import grokValue from '../Value.mjs';

// FixedTypeFieldVal ::= BuiltinValue | ReferencedValue
// FixedTypeFieldVal is a subset of Value, but close enough to being identical.
export default function grok(
  cst: Production,
  ctx: GrokContext
): FixedTypeFieldVal {
  return grokValue(cst, ctx);
}
