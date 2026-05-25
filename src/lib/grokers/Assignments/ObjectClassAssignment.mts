import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ObjectClassAssignment from '../../constructs/AssignmentTypes/ObjectClassAssignment.mjs';
import AssignmentType from '../../constructs/AssignmentType.mjs';
import grokObjectClass from '../ObjectClass.mjs';
import grokParameter from '../Parameter.mjs';
import type Parameter from '../../constructs/Parameter.mjs';
import hasDuplicates from '../../hasDuplicates.mjs';

// ObjectClassAssignment ::=
//     objectclassreference "::=" ObjectClass

export default function grok(
  cst: Production,
  ctx: GrokContext
): ObjectClassAssignment {
  const text: string = ctx.text;
  const reference: Production = cst.children[0];
  const identifier: string = text.slice(
    reference.location.startIndex,
    reference.location.endIndex
  );
  const ParameterList: Production | undefined = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.ParameterList
  );
  const assignmentOperator: Production | undefined = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.assignment
  );
  if (!assignmentOperator) {
    throw new Error('No assignment operator found.');
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
    throw new Error(
      `Duplicate parameters detected in ObjectClassAssignment '${identifier}'.`
    );
  }
  return {
    identifier,
    assignmentType: AssignmentType.ObjectClassAssignment,
    leftHandSide: text.slice(
      cst.location.startIndex,
      assignmentOperator.location.startIndex
    ),
    rightHandSide: text.slice(
      assignmentOperator.location.endIndex,
      cst.location.endIndex
    ),
    objectClass: grokObjectClass(cst.children[cst.children.length - 1], ctx),
    parameters,
    dependencies: {},
    production: cst,
  };
}
