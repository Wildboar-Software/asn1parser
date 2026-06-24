import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type TypeAssignment from '../../constructs/AssignmentTypes/TypeAssignment.mjs';
import AssignmentType from '../../constructs/AssignmentType.mjs';
import grokType from '../Type.mjs';
import grokParameter from '../Parameter.mjs';
import type Parameter from '../../constructs/Parameter.mjs';
import hasDuplicates from '../../hasDuplicates.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';
import ASN1SemanticError from '../../errors/ASN1SemanticError.mjs';

export default function grokTypeAssignment(
  cst: Production,
  ctx: GrokContext
): TypeAssignment {
  const text: string = ctx.text;
  const reference: Production = cst.children[0];
  const identifier: string = text.slice(
    reference.location.startIndex,
    reference.location.endIndex
  );
  const Type: Production = cst.children[cst.children.length - 1];
  const ParameterList: Production | undefined = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.ParameterList
  );
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
      `Duplicate parameters detected in TypeAssignment '${identifier}'.`,
      cst,
      ctx.currentModule.name,
      identifier,
    );
  }
  return {
    identifier,
    assignmentType: AssignmentType.TypeAssignment,
    leftHandSide: text.slice(
      cst.location.startIndex,
      assignmentOperator.location.startIndex
    ),
    rightHandSide: text.slice(
      assignmentOperator.location.endIndex,
      cst.location.endIndex
    ),
    type: grokType(Type, ctx),
    parameters,
    dependencies: {},
    production: cst,
  };
}
