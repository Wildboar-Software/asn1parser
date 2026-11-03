import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import type ValueAssignment from '../../constructs/AssignmentTypes/ValueAssignment.mjs';
import AssignmentType from '../../constructs/AssignmentType.mjs';
import grokType from '../Type.mjs';
import grokValue from '../Value.mjs';
import grokParameter from '../Parameter.mjs';
import type Parameter from '../../constructs/Parameter.mjs';
import hasDuplicates from '../../hasDuplicates.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';
import ASN1SemanticError from '../../errors/ASN1SemanticError.mjs';

// ValueAssignment ::=
//     valuereference Type "::=" Value

// ParameterizedValueAssignment ::=
//     valuereference ParameterList Type "::=" Value

export default function grok(
  cst: Production,
  ctx: GrokContext
): ValueAssignment {
  const base: number = ctx.textStartsAtOffset ?? 0;
  const text: string = ctx.text;
  const reference: Production = cst.children[0];
  const identifier: string = text.slice(
    reference.location.startIndex - base,
    reference.location.endIndex - base
  );
  const Type: Production = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.Type
  ) as Production;
  const ParameterList: Production | undefined = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.ParameterList
  );
  const Value: Production = cst.children[cst.children.length - 1];
  const assignmentOperator: Production | undefined = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.assignment
  );
  if (!assignmentOperator) {
    throw new ASN1SyntaxError(cst, 'No assignment operator found.');
  }
  const parameters = ParameterList?.children
    .filter(
      (child: Production): boolean =>
        child.type === ProductionType.ParameterList
    )[0]
    .children.filter(
      (child: Production): boolean => child.type === ProductionType.Parameter
    )
    .map((param: Production): Parameter => grokParameter(param, ctx));

  if (parameters && hasDuplicates(parameters.map((p) => p.dummyReference))) {
    throw new ASN1SemanticError(
      `Duplicate parameters detected in ValueAssignment '${identifier}'.`,
      cst,
      ctx.currentModule.name,
      identifier,
    );
  }
  return {
    identifier,
    assignmentType: AssignmentType.ValueAssignment,
    leftHandSide: text.slice(
      cst.location.startIndex - base,
      assignmentOperator.location.startIndex - base
    ),
    rightHandSide: text.slice(
      assignmentOperator.location.endIndex - base,
      cst.location.endIndex - base
    ),
    type: grokType(Type, ctx),
    value: grokValue(Value, ctx),
    parameters,
    dependencies: {},
    production: cst,
  };
}
