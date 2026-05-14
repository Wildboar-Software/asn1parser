import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import { type SubtypeConstraint } from '../../constructs/ConstraintSpecs/SubtypeConstraint.js';
import grokElementSetSpecs from '../ElementSetSpecs.js';

/**
 * `GeneralConstraint ::= UserDefinedConstraint | TableConstraint | ContentsConstraint`
 */
export default function grok(
  cst: Production,
  ctx: GrokContext
): SubtypeConstraint {
  return grokElementSetSpecs(cst, ctx);
}
