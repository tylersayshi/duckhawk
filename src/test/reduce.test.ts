import { reduce } from "../reduce.ts";
import { expect } from "@std/expect";

Deno.test("reduce simple", async () => {
  const result = await reduce(
    [1, 2, 3],
    (acc, item) => Promise.resolve(acc + item),
    0
  );
  expect(result).toEqual(6);
});

Deno.test("reduce error", async () => {
  await expect(
    reduce(
      [1, new Error("fail")],
      (acc, item) => {
        if (item instanceof Error) {
          throw item;
        }
        return Promise.resolve(acc + item);
      },
      0
    )
  ).rejects.toThrow("fail");
});
