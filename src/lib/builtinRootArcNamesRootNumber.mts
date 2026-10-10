
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

/**
 * Recognized names for a root arc number, in the order defined above.
 * Numbers other than 0, 1, and 2 have no recognized names.
 */
export function recognizedRootArcNamesForNumber(arc: number): string[] {
    const names: string[] = [];
    for (const [name, number] of builtinRootArcNamesToNumber) {
        if (number === arc) {
            names.push(name);
        }
    }
    return names;
}

export default builtinRootArcNamesToNumber;
