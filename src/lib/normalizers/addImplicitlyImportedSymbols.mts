import type Module from '../constructs/Module.mjs';

/**
 * @summary Add any dependencies that were "implicitly imported" to an ASN.1
 *  module's imports
 * @description
 * There are some circumstances in which ASN.1 does not require symbols to be
 * imported, even though they are used. The most egregious among them are
 * `ENUMERATED` values. `ENUMERATED` values are represented in ASN.1 syntax by
 * the identifiers that the corresponding `ENUMERATED` type defines, but there
 * is no requirement to import the `ENUMERATED` type to which that value refers
 * to use one of its alternatives.
 *
 * This parser determines dependencies empirically--by drilling into an
 * assignment and seeing what identifiers / references it actually uses. Since
 * there are scenarios where dependencies can be "implicitly imported" as
 * described above, we need a way to make those imports explicit for the sake
 * of correct compilation down the road. That is what this function ensures.
 *
 * @param {Module} mod The ASN.1 module whose imports are to be updated.
 * @function
 */
export default function addImplicitlyImportedSymbols(mod: Module): void {
  Object.values(mod.assignments).forEach((assn) =>
    Object.values(assn.dependencies).forEach((dep) => {
      const moduleName = dep.module ?? dep.computedModule;
      if (!moduleName || moduleName === mod.name) {
        return;
      }
      if (!(moduleName in mod.imports.modules)) {
        mod.imports.modules[moduleName] = {
          identifier: moduleName,
          assignedIdentifier: undefined,
          symbolList: {},
          duplicateSymbols: [],
        };
      }
      mod.imports.modules[moduleName].symbolList[dep.reference] = dep.production ?? null;
    })
  );
}
