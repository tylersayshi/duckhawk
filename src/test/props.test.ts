import { props } from "../props.ts";
import { expect } from "@std/expect";
import { delayedReject } from "./utils.ts";

Deno.test("props", async () => {
  const result = await props({
    a: Promise.resolve(1),
    b: Promise.resolve(2),
    c: Promise.resolve(3),
  });
  expect(result).toEqual({ a: 1, b: 2, c: 3 });
});

Deno.test("props with mixed types", async () => {
  const result = await props({
    a: Promise.resolve(1),
    b: Promise.resolve("hi"),
    c: Promise.resolve({ foo: "bar" }),
  });
  expect(result).toEqual({ a: 1, b: "hi", c: { foo: "bar" } });
});

Deno.test("props with mixed types and async", async () => {
  const result = await props({
    a: Promise.resolve(1),
    b: Promise.resolve("hi"),
    // deno-lint-ignore require-await
    c: (async () => ({ foo: "bar" }))(),
  });
  expect(result).toEqual({ a: 1, b: "hi", c: { foo: "bar" } });
});

Deno.test("props with some failing", () => {
  expect(
    props({
      a: Promise.resolve(1),
      b: Promise.reject(new Error("fail")),
    })
  ).rejects.toThrow("fail");
});

Deno.test("props throws first given and rejected", async () => {
  const firstError = new Error("first");
  const secondError = new Error("second");

  await expect(
    props({
      a: delayedReject(firstError, 20),
      b: delayedReject(secondError, 10),
    })
  ).rejects.toEqual(firstError);
});
