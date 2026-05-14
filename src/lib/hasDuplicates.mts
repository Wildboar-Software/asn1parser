/**
 * @summary Determines if an array has duplicate elements.
 * @param {Array} arr The array to be searched for duplicates.
 * @returns {boolean} Whether the array has duplicates.
 */
export default function hasDuplicates<T>(arr: Array<T>): boolean {
  return new Set<T>(arr).size !== arr.length;
}
