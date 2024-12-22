/**
 * reduce implementation with async/await.
 *
 * @param arr list of items to create a promise for
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
export const reduce = async <Item, InitialValue>(
  arr: Item[],
  iterator: (
    acc: InitialValue,
    item: Item,
    index: number
  ) => Promise<InitialValue>,
  initialValue: InitialValue
): Promise<InitialValue> => {
  let result = initialValue;
  for (let i = 0; i < arr.length; i++) {
    result = await iterator(result, arr[i], i);
  }
  return result;
};
