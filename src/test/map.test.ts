import { map } from "../map.ts";
import { expect } from "@std/expect";

Deno.test("map simple", async () => {
  const result = await map([1, 2, 3], (item) => Promise.resolve(item + 1));
  expect(result).toEqual([2, 3, 4]);
});

Deno.test("map with mixed types", async () => {
  const result = await map([1, "hi", { foo: "bar" }], (item) =>
    Promise.resolve(typeof item === "object" ? item : item + "!")
  );
  expect(result).toEqual(["1!", "hi!", { foo: "bar" }]);
});

Deno.test("map concurrency", async () => {
  for (let i = 1; i < 11; i++) {
    const order: number[] = [];

    const result = await map(
      Array.from({ length: 10 * i }).map((_, i) => i + 1),
      (item, ind) => {
        order.push(item);
        expect(order).toEqual(
          Array.from({ length: ind + 1 }).map((_, i) => i + 1)
        );
        return Promise.resolve(item);
      },
      { concurrency: Math.random() * 10 }
    );

    expect(result).toEqual(Array.from({ length: 10 * i }).map((_, i) => i + 1));
  }
});
