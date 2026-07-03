import type { default as Module } from "./constructs/Module.mjs";

/**
 * @summary Check if a symbol is defined or imported in an ASN.1 module
 * @description
 * 
 * This function was defined basically to check for undefined references as
 * part of validation of ASN.1 modules.
 * 
 * @param mod The ASN.1 module in which to search for a definition or import
 * @param ident The sought identifier
 * @returns `true` if the symbol is defined or imported in this module.
 * 
 * @function
 */
export
function isDefinedOrImported(mod: Module, ident: string): boolean {
    return (
        (ident in mod.assignments)
        || Object.values(mod.imports.modules)
            .some((sfm) => ident in sfm.symbolList)
        || (ident === "TYPE-IDENTIFIER")
        || (ident === "ABSTRACT-SYNTAX")
    );
}

export default isDefinedOrImported;
