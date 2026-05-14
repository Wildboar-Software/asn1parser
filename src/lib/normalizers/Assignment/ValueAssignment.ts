import type Module from '../../constructs/Module.js';
import type ValueAssignment from '../../constructs/AssignmentTypes/ValueAssignment.js';
import identifyDependencies from '../../normalizers/identifyDependencies.js';
import getUnprefixedType from '../../getUnprefixedType.js';
import recursivelyResolve from '../../recursivelyResolve.js';
import unnestType from '../../normalizers/unnest.js';
import TypeType from '../../constructs/TypeType.js';
import removeItemDependencies from '../removeItemDependencies.js';
import AssignmentType from '../../constructs/AssignmentType.js';

function uppercaseInitial(str: string): string {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

export default function normalize(
  assignment: ValueAssignment,
  currentModule: Module,
  modulesInScope: Module[]
): void {
  unnestType(
    assignment.type,
    currentModule,
    modulesInScope,
    [uppercaseInitial(assignment.identifier), 'Type'],
    assignment.parameters
  );
  assignment.parameters?.forEach((param, index) => {
    if (
      typeof param.paramGovernor === 'object' &&
      'typeType' in param.paramGovernor &&
      param.paramGovernor.typeType !== TypeType.DefinedType
    ) {
      unnestType(param.paramGovernor, currentModule, modulesInScope, [
        assignment.identifier,
        `Parameter-${index}`,
      ]);
    }
  });
  identifyDependencies(
    assignment.parameters,
    assignment,
    currentModule,
    modulesInScope,
    0
  );
  identifyDependencies(
    assignment.type,
    assignment,
    currentModule,
    modulesInScope,
    0
  );
  identifyDependencies(
    assignment.value,
    assignment,
    currentModule,
    modulesInScope,
    0
  );

  const unprefixedType = getUnprefixedType(assignment.type);
  if (unprefixedType.typeType !== TypeType.DefinedType) {
    return;
  }
  const ta = recursivelyResolve(
    unprefixedType.type,
    currentModule,
    modulesInScope
  );
  if (!ta) {
    return;
  }
  if (ta.assignmentType !== AssignmentType.TypeAssignment) {
    throw new Error(ta.assignmentType);
  }
  identifyDependencies(ta.type, assignment, currentModule, modulesInScope);
  Object.values(ta.dependencies).forEach((dep) =>
    removeItemDependencies(assignment, dep, currentModule, modulesInScope)
  );
}
