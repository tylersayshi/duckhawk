/**
 * run Promises all in parallel and pass result to iterator
 *
 * @param arr list of items
 * @param iterator map callback to create a promise for each item
 * @param options concurrency to limit number of promises to run in parallel
 * @returns result of iterator for each promise
 *
 * @example
 * ```ts
 * const result = await duckhawk.map(
 *   [1, 2, 3],
 *   (item) => Promise.resolve(item + 1),
 *   { concurrency: 2 }
 * );
 *
 * console.log(result); // [2, 3, 4]
 * ```
 */
export const map = async <Item, IteratorResult>(
  arr: Item[],
  iterator: (item: Item, index: number) => Promise<IteratorResult>,
  options?: {
    concurrency?: number;
  }
): Promise<IteratorResult[]> => {
  const results: IteratorResult[] = [];

  const chunkSize = options?.concurrency ?? arr.length;

  for (let i = 0; i * chunkSize < arr.length; i++) {
    const promiseResults = await Promise.allSettled(
      arr.slice(i * chunkSize, (i + 1) * chunkSize).map(async (item, ind) => {
        const result = await iterator(await item, i * chunkSize + ind);
        if (result instanceof Error) {
          throw result;
        }
        return result;
      })
    );
    const firstError = promiseResults.find(
      (result) => result.status === "rejected"
    );
    if (firstError) {
      throw firstError.reason;
    }
    const filteredResults = promiseResults.map((result) =>
      result.status === "fulfilled" ? result.value : (undefined as never)
    );

    results.push(...filteredResults);
  }

  return results;
};
