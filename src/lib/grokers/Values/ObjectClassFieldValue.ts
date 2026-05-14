import type GrokContext from '../../interfaces/GrokContext.js';
import { type ObjectClassFieldValue } from '../../constructs/Values/ObjectClassFieldValue.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import grokFixedTypeFieldVal from './FixedTypeFieldVal.js';
import grokOpenTypeFieldVal from './OpenTypeFieldVal.js';

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
