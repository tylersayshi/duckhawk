import { allChunked } from "../all-chunked.ts";
import { expect } from "@std/expect";

Deno.test("allChunked simple", async () => {
  const result = await allChunked(
    [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
    2
  );
  expect(result).toEqual([1, 2, 3]);
});

Deno.test("allChunked with mixed types", async () => {
  const result = await allChunked(
    [
      Promise.resolve(1),
      Promise.resolve("hi"),
      Promise.resolve({ foo: "bar" }),
    ],
    2
  );
  expect(result).toEqual([1, "hi", { foo: "bar" }]);
});

Deno.test("allChunked concurrency", async () => {
  for (let i = 1; i < 11; i++) {
    const result = await allChunked(
      Array.from({ length: 10 * i }).map((_, i) => Promise.resolve(i + 1)),
      Math.random() * 10
    );

    expect(result).toEqual(Array.from({ length: 10 * i }).map((_, i) => i + 1));
  }
});

Deno.test("allChunked error handling", async () => {
  await expect(
    allChunked([Promise.resolve(1), Promise.reject(new Error("fail"))], 2)
  ).rejects.toThrow("fail");
});
