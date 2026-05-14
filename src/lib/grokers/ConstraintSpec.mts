import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type ConstraintSpec } from '../constructs/ConstraintSpec.mjs';
import grokSubtypeConstraint from './ConstraintSpecs/SubtypeConstraint.mjs';
import grokGeneralConstraint from './ConstraintSpecs/GeneralConstraint.mjs';

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
