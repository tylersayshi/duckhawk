import { reduce } from "../reduce.ts";
import { expect } from "@std/expect";

Deno.test("reduce simple", async () => {
  const result = await reduce(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    (acc, item) => acc + item,
    0
  );
  expect(result).toEqual(6);
});

Deno.test("reduce error", async () => {
  await expect(
    reduce(
      [Promise.resolve(1), Promise.reject(new Error("fail"))],
      (acc, item) => acc + item,
      0
    )
  ).rejects.toThrow("fail");
});
