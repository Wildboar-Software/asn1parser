import type Module from '../../constructs/Module.mjs';
import recursivelyResolve from '../../recursivelyResolve.mjs';
import type ObjectAssignment from '../../constructs/AssignmentTypes/ObjectAssignment.mjs';
import AssignmentType from '../../constructs/AssignmentType.mjs';
import identifyDependencies from '../../normalizers/identifyDependencies.mjs';
import translateDefinedSyntaxToDefaultSyntax from '../translateDefinedSyntaxToDefaultSyntax.mjs';
import unnestType, { unnestObject } from '../../normalizers/unnest.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import removeItemDependencies from '../removeItemDependencies.mjs';
import ASN1SemanticError from '../../errors/ASN1SemanticError.mjs';

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
      throw new ASN1SemanticError(
        `Reference ${assignment.definedObjectClass.reference} did not resolve to an object class assignment.`,
        assignment.definedObjectClass.production,
        currentModule.name,
      );
    }
    if ('reference' in objectClassAssignment.objectClass) {
      throw new ASN1SemanticError(
        `Reference ${assignment.definedObjectClass.reference} could not be fully resolved.`,
        assignment.definedObjectClass.production,
        currentModule.name,
      );
    }

    /**
     * This section converts objects defined using DefinedSyntax into
     * equivalent objects defined using DefaultSyntax.
     */
    if ('tokens' in assignment.object) {
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
