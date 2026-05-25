import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import type Constraint from '../constructs/Constraint.mjs';
import grokConstraintSpec from './ConstraintSpec.mjs';
import grokExceptionSpec from './ExceptionSpec.mjs';

// `Constraint ::= "(" ConstraintSpec ExceptionSpec ")"`
// Not a lot of effort is going into groking Constraints, because they would be
// so difficult to grok and often useless for generating code.

export default function grok(cst: Production, ctx: GrokContext): Constraint {
  const components: Production[] = cst.children
    .slice(1, -1) // Remove the parentheses.
    .filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    );

  const ConstraintSpec: Production = components[0];
  const ExceptionSpec: Production = components[1];

  return {
    spec: grokConstraintSpec(ConstraintSpec, ctx),
    exception:
      ExceptionSpec && ExceptionSpec.children.length > 0
        ? grokExceptionSpec(ExceptionSpec, ctx)
        : undefined,
    production: cst,
  };
}
