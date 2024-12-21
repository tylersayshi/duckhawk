// deno-lint-ignore-file no-explicit-any

/**
 * run Promises all in series
 *
 * @param arr list of promises
 * @param iterator map callback for each promise result
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
export const mapSeries = async <
  PromiseGiven extends Promise<any>,
  IteratorResult
>(
  arr: PromiseGiven[],
  iterator: (item: Awaited<PromiseGiven>, index: number) => IteratorResult
): Promise<IteratorResult[]> => {
  const results: IteratorResult[] = [];
  for (let i = 0; i < arr.length; i++) {
    const result = await iterator(await arr[i], i);
    results.push(result);
  }
  return results;
};
