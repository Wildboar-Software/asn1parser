import type Module from '../../constructs/Module.mjs';
import type ObjectClassAssignment from '../../constructs/AssignmentTypes/ObjectClassAssignment.mjs';
import identifyDependencies from '../../normalizers/identifyDependencies.mjs';
import unnestType from '../../normalizers/unnest.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import removeItemDependencies from '../removeItemDependencies.mjs';

export default function normalize(
  assignment: ObjectClassAssignment,
  currentModule: Module,
  modulesInScope: Module[]
): void {
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
    assignment.objectClass,
    assignment,
    currentModule,
    modulesInScope,
    0
  );
  Object.values(assignment.dependencies).forEach((dep) =>
    removeItemDependencies(assignment, dep, currentModule, modulesInScope)
  );
}
