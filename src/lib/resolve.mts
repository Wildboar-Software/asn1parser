import { type Assignment } from './constructs/Assignment.mjs';
import type Defined from './constructs/Defined.mjs';
import type Module from './constructs/Module.mjs';
import TYPE_IDENTIFIER from './constructs/BuiltinClasses/TYPE-IDENTIFIER.mjs';
import ABSTRACT_SYNTAX from './constructs/BuiltinClasses/ABSTRACT-SYNTAX.mjs';

/**
 * @summary Recursively resolve the assignment to which a reference refers.
 * @description
 * Determine the assignment to which a reference refers. If the resolved
 * assignment is an alias for a reference, that reference will not be further
 * resolved.
 *
 * If you need this recursive behavior, consider using `recursivelyResolve()`.
 *
 * @param {Defined} def The reference to be resolved.
 * @param {Module} currentModule The current module, which will be searched
 *  first.
 * @param {Module[]} modulesInScope All modules in scope.
 * @returns The `Assigment` if it can be resolved, otherwise `undefined`.
 * @function
 */
export default function resolve(
  def: Defined,
  currentModule: Module,
  modulesInScope: Module[]
): Assignment | undefined {
  if (def.module === undefined && def.reference === 'TYPE-IDENTIFIER') {
    return TYPE_IDENTIFIER;
  }
  if (def.module === undefined && def.reference === 'ABSTRACT-SYNTAX') {
    return ABSTRACT_SYNTAX;
  }
  let module_: Module | undefined = def.module
    ? modulesInScope.find((mod: Module): boolean => mod.name === def.module)
    : def.computedModule
    ? modulesInScope.find(
        (mod: Module): boolean => mod.name === def.computedModule
      )
    : currentModule;
  if (!module_) {
    return undefined;
  }
  let assn: Assignment | undefined = module_.assignments[def.reference];

  /**
   * If the assignment was not defined in the indicated or current module, it
   * must have been imported, so we have to check the imports.
   */
  if (!assn) {
    let moduleName: string | undefined = undefined;
    // Iterate over all imported symbols to find which module it came from.
    // We use for-loops here so we can bail out early when we finally find the module.
    const importedModules = Object.values(module_.imports.modules);
    for (let m: number = 0; m < importedModules.length; m++) {
      const importedModule = importedModules[m];
      const importedSymbols = Object.keys(importedModule.symbolList);
      for (let s: number = 0; s < importedSymbols.length; s++) {
        const symbol: string = importedSymbols[s];
        if (symbol === def.reference) {
          moduleName = importedModule.identifier;
          break;
        }
      }
      if (moduleName) {
        break;
      }
    }

    if (!moduleName) {
      return undefined;
    }

    module_ = modulesInScope.find(
      (mod: Module): boolean => mod.name === moduleName
    );
    if (!module_) {
      return undefined;
    }

    // TODO: This will not handle the assignment being re-exported more than once...
    assn = module_.assignments[def.reference];
  }

  if (assn && !assn.module) {
    assn.module = {
      name: module_.name,
    };
  }
  return assn;
}
