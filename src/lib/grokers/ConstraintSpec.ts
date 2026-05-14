import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type ConstraintSpec } from '../constructs/ConstraintSpec.js';
import grokSubtypeConstraint from './ConstraintSpecs/SubtypeConstraint.js';
import grokGeneralConstraint from './ConstraintSpecs/GeneralConstraint.js';

/**
 * `ConstraintSpec ::= SubtypeConstraint | GeneralConstraint`
 */
export default function grok(
  cst: Production,
  ctx: GrokContext
): ConstraintSpec {
  const alt = cst.children[0];
  if (alt.type === ProductionType.SubtypeConstraint) {
    return grokSubtypeConstraint(alt, ctx);
  } else if (alt.type === ProductionType.GeneralConstraint) {
    return grokGeneralConstraint(alt, ctx);
  } else {
    throw new Error();
  }
}
