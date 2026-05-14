import type Module from './constructs/Module.js';
import { type Assignment } from './constructs/Assignment.js';
import AssignmentType from './constructs/AssignmentType.js';
import applyModuleIdentifierToAssignments from './normalizers/applyModuleIdentifierToAssignments.js';
import normalizeTypeAssignment from './normalizers/Assignment/TypeAssignment.js';
import normalizeValueAssignment from './normalizers/Assignment/ValueAssignment.js';
import normalizeObjectAssignment from './normalizers/Assignment/ObjectAssignment.js';
import normalizeObjectClassAssignment from './normalizers/Assignment/ObjectClassAssignment.js';
import normalizeObjectSetAssignment from './normalizers/Assignment/ObjectSetAssignment.js';
import normalizeValueSetTypeAssignment from './normalizers/Assignment/ValueSetTypeAssignment.js';
import * as dg from 'dependency-graph';
import consoleLogger from './loggers/console.js';
import type Logger from './interfaces/Logger.js';
import addImplicitlyImportedSymbols from './normalizers/addImplicitlyImportedSymbols.js';
import getDuplicates from './getDuplicates.js';

/**
 * @summary Normalize the abstract syntax trees of ASN.1 modules.
 * @description
 *
 * Normalization does (but is not limited to) these transformations:
 *
 * - Unnesting nested constructed types.
 * - Convert objects defined using a defined syntax into the equivalent
 *   default syntax.
 * - Identifying dependencies.
 * - Resolving dependency ordering.
 *
 * @param {Module[]} modules The modules to be normalized by reference.
 * @param {Logger} logger The logging plugin to use.
 * @returns {Module[]} The modules that were supplied, but normalized.
 */
export default function normalize(
  modules: Module[],
  logger: Logger = consoleLogger
): Module[] {
    const duplicates = Array.from(getDuplicates(modules.map((mod) => mod.name)));
    if (duplicates.length > 0) {
        throw new Error(`Duplicated modules: ${duplicates.join(", ")}`);
    }
  modules.forEach((currentModule: Module): void => {
    Object.values(currentModule.assignments).forEach(
      (assignment: Assignment): void => {
        switch (assignment.assignmentType) {
          case AssignmentType.TypeAssignment: {
            normalizeTypeAssignment(assignment, currentModule, modules);
            break;
          }
          case AssignmentType.ValueAssignment: {
            normalizeValueAssignment(assignment, currentModule, modules);
            break;
          }
          case AssignmentType.ObjectAssignment: {
            normalizeObjectAssignment(assignment, currentModule, modules);
            break;
          }
          case AssignmentType.ObjectClassAssignment: {
            normalizeObjectClassAssignment(assignment, currentModule, modules);
            break;
          }
          case AssignmentType.ObjectSetAssignment: {
            normalizeObjectSetAssignment(assignment, currentModule, modules);
            break;
          }
          case AssignmentType.ValueSetTypeAssignment: {
            normalizeValueSetTypeAssignment(assignment, currentModule, modules);
            break;
          }
          default: {
            return;
          }
        }
      }
    );

    modules.forEach(addImplicitlyImportedSymbols);

    /**
     * We do this in part to make the assignments independent from their defining
     * modules, but also because the use of resolve() will be able to tell which
     * module the assignment came from, which will be instrumental in applying
     * tagging to components of a constructed type according to the default
     * tagging mode of the module in which it appears rather than the module
     * into which it is imported, as is required by implication by ITU X.680,
     * section 25.4.
     */
    modules.forEach(applyModuleIdentifierToAssignments);

    // This must be done after all other assignment normalization.
    try {
      const dependencyGraph: dg.DepGraph<undefined> =
        new dg.DepGraph<undefined>({ circular: true });
      // You must add all nodes first.
      Object.values(currentModule.assignments).forEach(
        (assignment: Assignment): void => {
          dependencyGraph.addNode(
            `${currentModule.name}.${assignment.identifier}`
          );
        }
      );
      Object.values(currentModule.assignments).forEach(
        (assignment: Assignment): void => {
          Object.entries(assignment.dependencies || {})
            .filter(
              (kv): boolean =>
                kv[1].computedModule === currentModule.name ||
                kv[1].module === currentModule.name
            )
            .forEach((kv): void => {
              if (dependencyGraph.hasNode(kv[0])) {
                dependencyGraph.addDependency(
                  `${currentModule.name}.${assignment.identifier}`,
                  kv[0]
                );
              }
            });
        }
      );
      dependencyGraph
        .overallOrder()
        .map((dep: string): string => dep.slice(dep.indexOf('.') + 1))
        .forEach((dep: string, index: number): void => {
          const a: Assignment | undefined = currentModule.assignments[dep];
          if (!a) {
            throw new Error(
              `Could not find assignment for '${dep}' in module '${currentModule.name}'.`
            );
          }
          a.dependencyIndex = index;
        });
    } catch (e) {
      logger.warn(`Could not generate dependency graph. Error: ${e}`);
    }
  });

  return modules;
}
