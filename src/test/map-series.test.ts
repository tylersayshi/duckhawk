import { mapSeries } from "../map-series.ts";
import { expect } from "@std/expect";

Deno.test("mapSeries simple", async () => {
  const result = await mapSeries([1, 2, 3], (item) =>
    Promise.resolve(item + 1)
  );
  expect(result).toEqual([2, 3, 4]);
});

Deno.test("mapSeries with mixed types", async () => {
  const result = await mapSeries([1, "hi", { foo: "bar" }], (item) =>
    Promise.resolve(typeof item === "object" ? item : item + "!")
  );
  expect(result).toEqual(["1!", "hi!", { foo: "bar" }]);
});

Deno.test("mapSeries executes in order", async () => {
  const order: number[] = [];
  const result = await mapSeries([1, 2, 3], (item, ind) => {
    order.push(item);
    expect(order).toEqual(Array.from({ length: ind + 1 }).map((_, i) => i + 1));
    return Promise.resolve(item);
  });

  expect(result).toEqual([1, 2, 3]);
});
