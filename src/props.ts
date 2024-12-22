/**
 * props implementation with Promise.allSettled. bluebird.props threw on first error
 * and cleaned up the promise chain to avoid leaks. We do not do this.
 *
 * Using Promise natively here means we cannot cleanup the promise chain, so we wait for `allSettled` and
 * throw the first error we encounter based on input order after all settle.
 *
 * @param props - Object of promises to resolve
 * @returns Promise that resolves with object of resolved values
 *
 * @example
 * ```ts
 * const result = await duckhawk.props({
 *   a: Promise.resolve(1),
 *   b: Promise.resolve(2),
 *   c: Promise.resolve(3),
 * });
 *
 * console.log(result); // { a: 1, b: 2, c: 3 }
 * ```
 */
export const props = async <
  T extends Record<string, unknown>,
  K extends keyof T
>(props: {
  [P in K]: T[P];
}): Promise<{
  [P in K]: Awaited<T[P]>;
}> => {
  const entries = Object.entries(props);

  const results = await Promise.allSettled(
    entries.map(async ([key, callback]) => {
      const result = await callback;
      if (result instanceof Error) {
        throw result;
      }
      return [key, result];
    })
  );

  const firstError = results.find((result) => result.status === "rejected");
  if (firstError) {
    throw firstError.reason;
  }

  return Object.fromEntries(
    results.map((result) =>
      result.status === "fulfilled" ? result.value : (undefined as never)
    )
  ) as {
    [P in K]: Awaited<T[P]>;
  };
};
