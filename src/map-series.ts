/**
 * run Promises all in series
 *
 * @param arr list of items
 * @param iterator map callback for creating a promise for each item
 * @returns result of iterator for each promise
 *
 * @example
 * ```ts
 * const result = await duckhawk.mapSeries([
 *   Promise.resolve(1),
 *   Promise.resolve(2),
 *   Promise.resolve(3),
 * ], (item) => item + 1);
 *
 * console.log(result); // [2, 3, 4]
 * ```
 */
export const mapSeries = async <Item, IteratorResult>(
  arr: Item[],
  iterator: (item: Item, index: number) => Promise<IteratorResult>
): Promise<IteratorResult[]> => {
  const results: IteratorResult[] = [];
  for (let i = 0; i < arr.length; i++) {
    const result = await iterator(arr[i], i);
    results.push(result);
  }
  return results;
};
