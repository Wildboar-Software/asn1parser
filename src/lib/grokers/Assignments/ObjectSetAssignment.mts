import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ObjectSetAssignment from '../../constructs/AssignmentTypes/ObjectSetAssignment.mjs';
import AssignmentType from '../../constructs/AssignmentType.mjs';
import grokDefinedObjectClass from '../Defined.mjs';
import grokObjectSet from '../ObjectSet.mjs';
import grokParameter from '../Parameter.mjs';
import type Parameter from '../../constructs/Parameter.mjs';
import hasDuplicates from '../../hasDuplicates.mjs';

// ObjectSetAssignment ::=
//     objectsetreference DefinedObjectClass "::=" ObjectSet

export default function grok(
  cst: Production,
  ctx: GrokContext
): ObjectSetAssignment {
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
  const ObjectSet: Production = cst.children[cst.children.length - 1];
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
      `Duplicate parameters detected in ObjectSetAssignment '${identifier}'.`
    );
  }
  return {
    identifier,
    assignmentType: AssignmentType.ObjectSetAssignment,
    leftHandSide: text.slice(
      cst.location.startIndex,
      assignmentOperator.location.startIndex
    ),
    rightHandSide: text.slice(
      assignmentOperator.location.endIndex,
      cst.location.endIndex
    ),
    definedObjectClass: grokDefinedObjectClass(DefinedObjectClass, ctx),
    objectSetSpec: grokObjectSet(ObjectSet, ctx),
    parameters,
    dependencies: {},
    production: cst,
  };
}
