import { type Assignment } from './constructs/Assignment.mjs';
import type Defined from './constructs/Defined.mjs';
import type Module from './constructs/Module.mjs';
import TYPE_IDENTIFIER from './constructs/BuiltinClasses/TYPE-IDENTIFIER.mjs';
import ABSTRACT_SYNTAX from './constructs/BuiltinClasses/ABSTRACT-SYNTAX.mjs';
import { asn1ModuleOidMatch, type ObjIdComponents, type SymbolsFromModule } from '../index.mjs';

/**
 * @summary Resolve the assignment to which a reference refers.
 * @description
 * Determine the assignment to which a reference refers. If the resolved
 * assignment is an alias for a reference, that reference will not be further
 * resolved.
 *
 * If you need this recursive behavior, consider using `recursivelyResolve()`.
 * 
 * This implementation is very wrong on a lot of levels. It basically just
 * checks that module names match from the import. This works in most cases,
 * but it is far from correct. If the OIDs differ, they should not match,
 * and if the names differ, but the OIDs match, they should match. This
 * probably will not get fixed until the next major version, because it
 * would be a large breaking change, notably making this function recursive.
 *
 * @param {Defined} def The reference to be resolved.
 * @param {Module} currentModule The current module, which will be searched
 *  first.
 * @param {Module[]} modulesInScope All modules in scope.
 * @param {boolean} tolerateModuleNameMismatch Whether to tolerate a module
 *  name mismatch.
 * @returns The `Assigment` if it can be resolved, otherwise `undefined`.
 * @function
 */
export default function resolve(
  def: Defined,
  currentModule: Module,
  modulesInScope: Module[],
  tolerateModuleNameMismatch: boolean = false,
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
    let sfm: SymbolsFromModule | undefined = undefined;
    // Iterate over all imported symbols to find which module it came from.
    // We use for-loops here so we can bail out early when we finally find the module.
    const importedModules = Object.values(module_.imports.modules);
    for (let m: number = 0; m < importedModules.length; m++) {
      const importedModule = importedModules[m];
      const importedSymbols = Object.keys(importedModule.symbolList);
      for (let s: number = 0; s < importedSymbols.length; s++) {
        const symbol: string = importedSymbols[s];
        if (symbol === def.reference) {
          sfm = importedModule;
          break;
        }
      }
      if (sfm) {
        break;
      }
    }

    if (!sfm) {
      return undefined;
    }

    const importoid: number[] | undefined = (
      tolerateModuleNameMismatch
      && sfm.assignedIdentifier
      && ("components" in sfm.assignedIdentifier)
      && (!sfm.assignedIdentifier.prefix)
    )
      ? sfm
        .assignedIdentifier
        .components
        .map((component: ObjIdComponents): number => (
          (
            ("number" in component)
            && (typeof component.number === "number")
          )
            ? component.number
            : -1
        ))
      : undefined
      ;

    /*
    NOTE: This implementation is problematic:
    
    §13.10: When an import specifies a definitive identification (OID),
    its module reference may differ from the original module's name.
    The accompanying note explicitly describes using this mechanism
    to import from two modules with the same original name.
    */
    module_ = modulesInScope.find(
      (mod: Module) => (
        (mod.name === sfm.identifier)
        || (
          mod.oid
          && importoid
          && asn1ModuleOidMatch(
            mod.oid.map((n): number => ("number" in n) ? n.number : -2),
            importoid,
            sfm.selectionOption,
          )
        )
      )
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
