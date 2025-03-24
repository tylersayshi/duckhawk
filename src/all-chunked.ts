type FinalItems<
  T extends Promise<unknown>[],
  Result extends unknown[] = []
> = T extends [infer Head, ...infer Tail extends Promise<unknown>[]]
  ? FinalItems<Tail, [...Result, Awaited<Head>]>
  : Result extends []
  ? Awaited<T[number]>[]
  : Result;

/**
 * run Promises all in parallel and return results. Uses `Promise.all` under the hood.
 *
 * @param arr list of promises
 * @param concurrency number of promises to run in parallel
 * @returns result of each promise
 *
 * @example
 * ```ts
 * const result = await duckhawk.allChunked(
 *   [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
 *   2
 * );
 *
 * console.log(result); // [1, 2, 3]
 * ```
 */
export const allChunked = async <const Items extends Promise<unknown>[]>(
  arr: Items,
  concurrency: number
): Promise<FinalItems<Items>> => {
  const results = [];

  const loops = Math.ceil(arr.length / concurrency);

  for (let i = 0; i < loops; i++) {
    const start = i * concurrency;
    const end = Math.min(arr.length, (i + 1) * concurrency);
    const chunk = arr.slice(start, end);
    const chunkResults = await Promise.all(chunk);
    results.push(...chunkResults);
  }

  return results as FinalItems<Items>;
};
