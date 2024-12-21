import { mapSeries } from "../map-series.ts";
import { expect } from "@std/expect";

Deno.test("mapSeries simple", async () => {
  const result = await mapSeries(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    (item) => item + 1
  );
  expect(result).toEqual([2, 3, 4]);
});

Deno.test("mapSeries with async", async () => {
  const result = await mapSeries(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    async (item) => item + (await Promise.resolve(1))
  );
  expect(result).toEqual([2, 3, 4]);
});

Deno.test("mapSeries with mixed types", async () => {
  const result = await mapSeries(
    [
      Promise.resolve(1),
      Promise.resolve("hi"),
      Promise.resolve({ foo: "bar" }),
    ],
    (item) => (typeof item === "object" ? item : item + "!")
  );
  expect(result).toEqual(["1!", "hi!", { foo: "bar" }]);
});

Deno.test("mapSeries executes in order", async () => {
  const order: number[] = [];
  const result = await mapSeries(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    (item, ind) => {
      order.push(item);
      expect(order).toEqual(
        Array.from({ length: ind + 1 }).map((_, i) => i + 1)
      );
      return item;
    }
  );

  expect(result).toEqual([1, 2, 3]);
});
