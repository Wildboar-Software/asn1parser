import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type SubtypeConstraint } from '../../constructs/ConstraintSpecs/SubtypeConstraint.mjs';
import grokElementSetSpecs from '../ElementSetSpecs.mjs';

/**
 * `GeneralConstraint ::= UserDefinedConstraint | TableConstraint | ContentsConstraint`
 */
export default function grok(
  cst: Production,
  ctx: GrokContext
): SubtypeConstraint {
  return grokElementSetSpecs(cst, ctx);
}
