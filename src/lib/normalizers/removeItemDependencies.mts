import { type Assignment } from '../constructs/Assignment.js';
import type Defined from '../constructs/Defined.js';
import type Module from '../constructs/Module.js';
import recursivelyResolve from '../recursivelyResolve.js';
import AssignmentType from '../constructs/AssignmentType.js';
import TypeType from '../constructs/TypeType.js';

function deleteFromDependencies(
  item: string,
  deps: Assignment['dependencies']
): void {
  Object.entries(deps)
    .filter(([, def]) => def.reference === item)
    .forEach(([key]) => {
      delete deps[key];
    });
}

export default function removeItemDependencies(
  assignment: Assignment,
  dep: Defined,
  currentModule: Module,
  modulesInScope: Module[]
): Defined {
  const assn = recursivelyResolve(dep, currentModule, modulesInScope);
  if (assn && assn.assignmentType === AssignmentType.TypeAssignment) {
    switch (assn.type.typeType) {
      case TypeType.BitStringType: {
        (assn.type.type.namedBitList ?? [])
          .map((nb) => nb.identifier)
          .forEach((item) =>
            deleteFromDependencies(item, assignment.dependencies)
          );
        break;
      }
      case TypeType.EnumeratedType: {
        (assn.type.type.items ?? [])
          .map((item) => item.identifier)
          .forEach((item) =>
            deleteFromDependencies(item, assignment.dependencies)
          );
        break;
      }
      case TypeType.IntegerType: {
        (assn.type.type.namedNumberList ?? [])
          .map((item) => item.identifier)
          .forEach((item) =>
            deleteFromDependencies(item, assignment.dependencies)
          );
        break;
      }
      default: {
        break;
      }
    }
  }
  return dep;
}
