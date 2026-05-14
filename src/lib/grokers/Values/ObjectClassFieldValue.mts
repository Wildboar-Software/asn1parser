import type GrokContext from '../../interfaces/GrokContext.mjs';
import { type ObjectClassFieldValue } from '../../constructs/Values/ObjectClassFieldValue.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import grokFixedTypeFieldVal from './FixedTypeFieldVal.mjs';
import grokOpenTypeFieldVal from './OpenTypeFieldVal.mjs';

/**
 * `ObjectClassFieldValue ::= OpenTypeFieldVal | FixedTypeFieldVal`
 */
export default function grok(
  cst: Production,
  ctx: GrokContext
): ObjectClassFieldValue {
  if (cst.children[0].type === ProductionType.OpenTypeFieldVal) {
    return grokOpenTypeFieldVal(cst.children[0], ctx);
  } else {
    return grokFixedTypeFieldVal(cst.children[0], ctx);
  }
}
