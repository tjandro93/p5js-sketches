/**
 * Iterate over a array calling `func` for each consecutive pair of elements
 * @param arr
 * @param func
 */
export function pairwise<T>(arr: T[], func: (item1: T, item2: T) => void) {
  for (let i = 0; i < arr.length - 1; i++) {
    func(arr[i], arr[i + 1]);
  }
}
