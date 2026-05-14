import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import type ValueAssignment from '../../constructs/AssignmentTypes/ValueAssignment.js';
import AssignmentType from '../../constructs/AssignmentType.js';
import grokType from '../Type.js';
import grokValue from '../Value.js';
import grokParameter from '../Parameter.js';
import type Parameter from '../../constructs/Parameter.js';
import hasDuplicates from '../../hasDuplicates.js';

// ValueAssignment ::=
//     valuereference Type "::=" Value

// ParameterizedValueAssignment ::=
//     valuereference ParameterList Type "::=" Value

export default function grok(
  cst: Production,
  ctx: GrokContext
): ValueAssignment {
  const text: string = ctx.text;
  const reference: Production = cst.children[0];
  const identifier: string = text.slice(
    reference.location.startIndex,
    reference.location.endIndex
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
      `Duplicate parameters detected in ValueAssignment '${identifier}'.`
    );
  }
  return {
    identifier,
    assignmentType: AssignmentType.ValueAssignment,
    leftHandSide: text.slice(
      cst.location.startIndex,
      assignmentOperator.location.startIndex
    ),
    rightHandSide: text.slice(
      assignmentOperator.location.endIndex,
      cst.location.endIndex
    ),
    type: grokType(Type, ctx),
    value: grokValue(Value, ctx),
    parameters,
    dependencies: {},
  };
}
