/**
 * @summary Returns duplicated elements
 * @param {Array} arr The array to be searched for duplicates.
 * @yields Any duplicated element
 */
export default
function* getDuplicates<T>(arr: Array<T>): IterableIterator<T> {
    const set = new Set<T>();
    for (const element of arr) {
        if (set.has(element)) {
            yield element;
        }
        set.add(element);
    }
}
