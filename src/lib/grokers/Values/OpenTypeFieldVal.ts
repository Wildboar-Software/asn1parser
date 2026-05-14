import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import type OpenTypeFieldVal from '../../constructs/Values/OpenTypeFieldVal.js';
import grokType from '../Type.js';
import grokValue from '../Value.js';

// OpenTypeFieldVal ::= Type ":" Value
export default function grok(
  cst: Production,
  ctx: GrokContext
): OpenTypeFieldVal {
  const Type_: Production = cst.children[0];
  const Value_: Production = cst.children[cst.children.length - 1];
  return {
    type: grokType(Type_, ctx),
    value: grokValue(Value_, ctx),
  };
}
