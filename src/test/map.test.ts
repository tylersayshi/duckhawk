import { map } from "../map.ts";
import { expect } from "@std/expect";

Deno.test("map simple", async () => {
  const result = await map(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    (item) => item + 1
  );
  expect(result).toEqual([2, 3, 4]);
});

Deno.test("map with async", async () => {
  const result = await map(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    async (item) => item + (await Promise.resolve(1))
  );
  expect(result).toEqual([2, 3, 4]);
});

Deno.test("map with mixed types", async () => {
  const result = await map(
    [
      Promise.resolve(1),
      Promise.resolve("hi"),
      Promise.resolve({ foo: "bar" }),
    ],
    (item) => (typeof item === "object" ? item : item + "!")
  );
  expect(result).toEqual(["1!", "hi!", { foo: "bar" }]);
});

Deno.test("map concurrency", async () => {
  for (let i = 1; i < 11; i++) {
    const order: number[] = [];

    const result = await map(
      Array.from({ length: 10 * i }).map((_, i) => Promise.resolve(i + 1)),
      (item, ind) => {
        order.push(item);
        expect(order).toEqual(
          Array.from({ length: ind + 1 }).map((_, i) => i + 1)
        );
        return item;
      },
      { concurrency: Math.random() * 10 }
    );

    expect(result).toEqual(Array.from({ length: 10 * i }).map((_, i) => i + 1));
  }
});
