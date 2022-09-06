/**
 * Parition a 1D array into a 2D array. The partition happens when the provided `predicate` returns true.
 * For example, you could use this to partition an array containing numbers and nulls such that
 * whenever a null is encountered a new partition begins.
 * ```
 * // this outputs [[1, 2], [4, 5]]
 * partition([1, 2, null, 4, 5], (v) => v == null))
 * ```
 * @param arr
 * @param predicate
 * @returns
 */
export function partition<T>(arr: T[], predicate: (item: T) => boolean): T[][] {
  let currentPartition = [];
  const result = [currentPartition];

  arr.forEach((item) => {
    if (predicate(item)) {
      currentPartition = [];
      result.push(currentPartition);
    } else {
      currentPartition.push(item);
    }
  });

  return result.filter((item) => item.length > 0);
}
