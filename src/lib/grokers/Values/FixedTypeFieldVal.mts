import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import { type FixedTypeFieldVal } from '../../constructs/Values/FixedTypeFieldVal.js';
import grokValue from '../Value.js';

// FixedTypeFieldVal ::= BuiltinValue | ReferencedValue
// FixedTypeFieldVal is a subset of Value, but close enough to being identical.
export default function grok(
  cst: Production,
  ctx: GrokContext
): FixedTypeFieldVal {
  return grokValue(cst, ctx);
}
