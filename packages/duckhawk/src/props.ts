export const props = async <
  T extends Record<string, Promise<any>>,
  K extends keyof T,
>(
  props: Record<K, Promise<T[K]>>
): Promise<Record<K, T[K]>> => {
  const entries = Object.entries(props);

  const results = await Promise.all(
    entries.map(async ([key, callback]) => {
      const result = await callback;
      return [key, result];
    })
  );

  return Object.fromEntries(results);
};
