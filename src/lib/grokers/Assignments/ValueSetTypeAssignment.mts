import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ValueSetTypeAssignment from '../../constructs/AssignmentTypes/ValueSetTypeAssignment.mjs';
import AssignmentType from '../../constructs/AssignmentType.mjs';
import grokType from '../Type.mjs';
import grokValueSet from '../ValueSet.mjs';
import grokParameter from '../Parameter.mjs';
import type Parameter from '../../constructs/Parameter.mjs';
import hasDuplicates from '../../hasDuplicates.mjs';

// ValueSetTypeAssignment ::= typereference Type "::=" ValueSet
// ValueSet ::= "{" ElementSetSpecs "}"

export default function grok(
  cst: Production,
  ctx: GrokContext
): ValueSetTypeAssignment {
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
  const ValueSet: Production = cst.children[cst.children.length - 1];
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
      `Duplicate parameters detected in ValueSetTypeAssignment '${identifier}'.`
    );
  }
  return {
    identifier,
    assignmentType: AssignmentType.ValueSetTypeAssignment,
    leftHandSide: text.slice(
      cst.location.startIndex,
      assignmentOperator.location.startIndex
    ),
    rightHandSide: text.slice(
      assignmentOperator.location.endIndex,
      cst.location.endIndex
    ),
    type: grokType(Type, ctx),
    valueSet: grokValueSet(ValueSet, ctx),
    parameters,
    dependencies: {},
    production: cst,
  };
}
