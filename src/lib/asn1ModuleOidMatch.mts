import { SelectionOption } from "./constructs/SelectionOption.mjs";

/**
 * @summary Compare an ASN.1 module import with a module by object identifiers
 * @description
 * 
 * This function compares the object identifier taken from the assigned
 * identifier of a `SymbolsFromModule` production, which refers to an ASN.1
 * module, to an object identifier assigned to a particular module in that
 * module's `DefinitiveOID` production, observing the behavior of
 * `WITH SUCCESSORS` and `WITH DESCENDANTS`, if those are present.
 * 
 * @param modoid Arcs of the evaluated module's object identifier
 * @param importoid Arcs of the import object identifier
 * @param selopt The selection option: `WITH SUCCESSORS` or `WITH DESCENDANTS`
 * @returns `true` if the import object identifier matches the
 *  module's object identifier.
 * 
 * @function
 */
export
function asn1ModuleOidMatch(
    modoid: number[],
    importoid: number[],
    selopt?: SelectionOption,
): boolean {
    if (selopt === SelectionOption.WITH_DESCENDANTS) {
        if (importoid.length > modoid.length) {
            return false;
        }
        return importoid.every((arc, i) => arc === modoid[i]);
    }
    // Otherwise the lengths must be the same
    if (importoid.length !== modoid.length) {
        return false;
    }
    const len = importoid.length;
    if (selopt === SelectionOption.WITH_SUCCESSORS) {
        return (
            importoid
                .slice(0, -1)
                .every((arc, i) => arc === modoid[i])
            && (modoid[len - 1] >= importoid[len - 1])
        );
    }
    return importoid.every((arc, i) => arc === modoid[i]);
}

export default asn1ModuleOidMatch;
