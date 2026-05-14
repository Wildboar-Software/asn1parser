import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type ObjectAssignment from '../../constructs/AssignmentTypes/ObjectAssignment.js';
import AssignmentType from '../../constructs/AssignmentType.js';
import grokDefinedObjectClass from '../Defined.js';
import grokObject from '../Object.js';
import grokParameter from '../Parameter.js';
import type Parameter from '../../constructs/Parameter.js';
import hasDuplicates from '../../hasDuplicates.js';

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
      `Duplicate parameters detected in ObjectAssignment '${identifier}'.`
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
  };
}
