// deno-lint-ignore-file no-explicit-any

// TODO read docs and add tests
/**
 * reduce implementation with async/await.
 *
 * @param arr list of promises
 * @param iterator reduce callback for each promise result
 * @param initialValue initial value for reduce
 * @returns result of iterator for each promise
 *
 * @example
 * ```ts
 * const result = await duckhawk.reduce(
 *   [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
 *   (acc, item) => acc + item,
 *   0
 * );
 *
 * console.log(result); // 6
 * ```
 */
export const reduce = async <PromiseGiven extends Promise<any>, InitialValue>(
  arr: PromiseGiven[],
  iterator: (
    acc: InitialValue,
    item: Awaited<PromiseGiven>,
    index: number
  ) => InitialValue,
  initialValue: InitialValue
): Promise<InitialValue> => {
  let result = initialValue;
  for (let i = 0; i < arr.length; i++) {
    result = await iterator(result, await arr[i], i);
  }
  return result;
};
