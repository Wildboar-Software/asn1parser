import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import type OpenTypeFieldVal from '../../constructs/Values/OpenTypeFieldVal.mjs';
import grokType from '../Type.mjs';
import grokValue from '../Value.mjs';

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
    production: cst,
  };
}
