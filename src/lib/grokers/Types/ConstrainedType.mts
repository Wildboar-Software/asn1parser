import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import { type Type } from '../../constructs/Type.mjs';
import grokSetOrSequenceOfType from './SetOrSequenceOfType.mjs';
import grokType from '../Type.mjs';
import type Constraint from '../../constructs/Constraint.mjs';
import grokConstraint from '../Constraint.mjs';

// ConstrainedType ::=
//     Type Constraint
// 	| TypeWithConstraint

// TypeWithConstraint ::=
// 	SET Constraint OF Type
// 	| SET SizeConstraint OF Type
// 	| SEQUENCE Constraint OF Type
// 	| SEQUENCE SizeConstraint OF Type
// 	| SET Constraint OF NamedType
// 	| SET SizeConstraint OF NamedType
// 	| SEQUENCE Constraint OF NamedType
// 	| SEQUENCE SizeConstraint OF NamedType

// Constraint ::=
// 	"(" ConstraintSpec ExceptionSpec ")"

// ConstraintSpec ::=
//     SubtypeConstraint
// 	| GeneralConstraint

// SubtypeConstraint ::=
//     ElementSetSpecs

export default function grok(cst: Production, ctx: GrokContext): Type {
  if (cst.children[0].type === ProductionType.TypeWithConstraint) {
    return grokSetOrSequenceOfType(cst.children[0], ctx);
  }
  const type_: Type = grokType(cst.children[0], ctx);
  const constraints: Constraint[] = cst.children[
    cst.children.length - 1
  ].children
    .filter(
      (child: Production): boolean => child.type === ProductionType.Constraint
    )
    .map(
      (constraint: Production): Constraint => grokConstraint(constraint, ctx)
    );
  type_.constraints = constraints;
  return type_;
}
