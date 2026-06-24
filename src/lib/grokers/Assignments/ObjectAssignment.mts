import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ObjectAssignment from '../../constructs/AssignmentTypes/ObjectAssignment.mjs';
import AssignmentType from '../../constructs/AssignmentType.mjs';
import grokDefinedObjectClass from '../Defined.mjs';
import grokObject from '../Object.mjs';
import grokParameter from '../Parameter.mjs';
import type Parameter from '../../constructs/Parameter.mjs';
import hasDuplicates from '../../hasDuplicates.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';
import ASN1SemanticError from '../../errors/ASN1SemanticError.mjs';

// ObjectAssignment ::=
//     objectreference DefinedObjectClass "::=" Object

export default function grok(
  cst: Production,
  ctx: GrokContext
): ObjectAssignment {
  const text: string = ctx.text;
  const reference: Production = cst.children[0];
  const identifier: string = text.slice(
    reference.location.startIndex,
    reference.location.endIndex
  );
  const DefinedObjectClass: Production = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.DefinedObjectClass
  ) as Production;
  const ParameterList: Production | undefined = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.ParameterList
  );
  const Object_ = grokObject(cst.children[cst.children.length - 1], ctx);
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
      `Duplicate parameters detected in ObjectAssignment '${identifier}'.`,
      cst,
      ctx.currentModule.name,
      identifier,
    );
  }
  return {
    identifier,
    assignmentType: AssignmentType.ObjectAssignment,
    leftHandSide: text.slice(
      cst.location.startIndex,
      assignmentOperator.location.startIndex
    ),
    rightHandSide: text.slice(
      assignmentOperator.location.endIndex,
      cst.location.endIndex
    ),
    definedObjectClass: grokDefinedObjectClass(DefinedObjectClass, ctx),
    object: Object_,
    parameters,
    dependencies: {},
    production: cst,
  };
}
