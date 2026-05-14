import type Module from '../../constructs/Module.js';
import type ObjectSetAssignment from '../../constructs/AssignmentTypes/ObjectSetAssignment.js';
import identifyDependencies from '../../normalizers/identifyDependencies.js';
import unnestType, {
  unnestObjectSetAssignment,
} from '../../normalizers/unnest.js';
import TypeType from '../../constructs/TypeType.js';
import removeItemDependencies from '../removeItemDependencies.js';

export default function normalize(
  assignment: ObjectSetAssignment,
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
  unnestObjectSetAssignment(
    assignment,
    currentModule,
    modulesInScope,
    [assignment.identifier],
  );
  identifyDependencies(
    assignment.parameters,
    assignment,
    currentModule,
    modulesInScope,
    0
  );
  identifyDependencies(
    assignment.definedObjectClass,
    assignment,
    currentModule,
    modulesInScope,
    0
  );
  identifyDependencies(
    assignment.objectSetSpec,
    assignment,
    currentModule,
    modulesInScope,
    0
  );
  Object.values(assignment.dependencies).forEach((dep) =>
    removeItemDependencies(assignment, dep, currentModule, modulesInScope)
  );
}
