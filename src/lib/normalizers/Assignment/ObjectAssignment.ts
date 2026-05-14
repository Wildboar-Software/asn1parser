import type Module from '../../constructs/Module.js';
import recursivelyResolve from '../../recursivelyResolve.js';
import type ObjectAssignment from '../../constructs/AssignmentTypes/ObjectAssignment.js';
import AssignmentType from '../../constructs/AssignmentType.js';
import identifyDependencies from '../../normalizers/identifyDependencies.js';
import translateDefinedSyntaxToDefaultSyntax from '../translateDefinedSyntaxToDefaultSyntax.js';
import unnestType, { unnestObject } from '../../normalizers/unnest.js';
import TypeType from '../../constructs/TypeType.js';
import removeItemDependencies from '../removeItemDependencies.js';

export default function normalize(
  assignment: ObjectAssignment,
  currentModule: Module,
  modulesInScope: Module[]
): void {
  const objectClassAssignment = recursivelyResolve(
    assignment.definedObjectClass,
    currentModule,
    modulesInScope
  );
  if (objectClassAssignment) {
    if (
      objectClassAssignment.assignmentType !==
      AssignmentType.ObjectClassAssignment
    ) {
      throw new Error();
    }
    if ('reference' in objectClassAssignment.objectClass) {
      throw new Error();
    }

    /**
     * This section converts objects defined using DefinedSyntax into
     * equivalent objects defined using DefaultSyntax.
     */
    if (Array.isArray(assignment.object)) {
      // It is DefinedSyntax.
      if ('syntax' in objectClassAssignment.objectClass) {
        const [defaultSyntax] = translateDefinedSyntaxToDefaultSyntax(
          assignment.object,
          objectClassAssignment.objectClass.syntax ?? [],
          currentModule
        );
        if (defaultSyntax) {
          assignment.object = defaultSyntax;
        }
      }
    }

    if ('fieldSettings' in assignment.object) {
      unnestObject(
        assignment.object,
        objectClassAssignment,
        currentModule,
        modulesInScope,
        [assignment.identifier],
        assignment.parameters
      );
    }
    identifyDependencies(
      objectClassAssignment.objectClass,
      assignment,
      currentModule,
      modulesInScope
    );
  }

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
    assignment.object,
    assignment,
    currentModule,
    modulesInScope,
    0
  );
  identifyDependencies(
    { definedObjectClass: assignment.definedObjectClass },
    assignment,
    currentModule,
    modulesInScope,
    0
  );

  Object.values(assignment.dependencies).forEach((dep) =>
    removeItemDependencies(assignment, dep, currentModule, modulesInScope)
  );
}
