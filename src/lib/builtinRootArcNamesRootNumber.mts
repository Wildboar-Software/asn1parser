
/**
 * Built-in object identifier root arc names mapped to their corresponding
 * numeric values. These are defined in ITU-T Recommendation X.660 (2011),
 * Annex A.
 */
export const builtinRootArcNamesToNumber: Map<string, number> = new Map([
    ["itu-t", 0],
    ["ccitt", 0],
    ["iso", 1],
    ["joint-iso-itu-t", 2],
    ["joint-iso-ccitt", 2],
]);

export default builtinRootArcNamesToNumber;
