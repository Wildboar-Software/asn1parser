import type Module from '../../constructs/Module.js';
import type ValueSetTypeAssignment from '../../constructs/AssignmentTypes/ValueSetTypeAssignment.js';
import identifyDependencies from '../../normalizers/identifyDependencies.js';
import unnestType from '../../normalizers/unnest.js';
import TypeType from '../../constructs/TypeType.js';
import removeItemDependencies from '../removeItemDependencies.js';

function uppercaseInitial(str: string): string {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

export default function normalize(
  assignment: ValueSetTypeAssignment,
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
    assignment.valueSet,
    assignment,
    currentModule,
    modulesInScope,
    0
  );
  Object.values(assignment.dependencies).forEach((dep) =>
    removeItemDependencies(assignment, dep, currentModule, modulesInScope)
  );
}
