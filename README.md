# duckhawk

Native Promise based implementations of bluebird utilities with zero dependencies and miniature bundle size.

<img src="https://raw.githubusercontent.com/tylersayshi/duckhawk/main/img/falcon.png" alt="Duckie the hawk" width="200" height="200" />

## Install

Instructions on jsr: https://jsr.io/@tyler/duckhawk

## Docs

### allChunked

This helper is unique to duckhawk. We support easily running a large list of promises `n` at a time. This is useful for avoiding issues like running out of memory in Promise.all, avoiding being throttled with too many requests, and avoiding concurrent writes to the same resource.

```ts
import { allChunked } from "duckhawk";

const result = await allChunked(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  2
);

console.log(result); // [1, 2, 3]
```

### map

Bluebird equivalent: http://bluebirdjs.com/docs/api/promise.map.html

This awaits each promise in parallel and passes the result to the iterator. The result of the iterator is
returned as an array.

```ts
import { map } from "duckhawk";

const result = await map(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  (item) => item + 1
);
```

concurrency can be passed to limit the number of promises to run in parallel.

```ts
import { map } from "duckhawk";

const result = await map(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  (item) => item + 1,
  { concurrency: 2 }
);
```

### mapSeries

Bluebird equivalent: http://bluebirdjs.com/docs/api/promise.mapseries.html

This awaits each promise in series and passes the result to the iterator. The result of the iterator is
returned as an array.

```ts
import { mapSeries } from "duckhawk";

const result = await mapSeries(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  (item) => item + 1
);

console.log(result); // [2, 3, 4]
```

### props

Bluebird equivalent: http://bluebirdjs.com/docs/api/promise.props.html

We implement props with `Promise.allSettled` to give the same easy api for resolving a list of promises
as key/value pairs.

```ts
import { props } from "duckhawk";

const result = await props({
  one: fetch("https://pokeapi.co/api/v2/pokemon/1").then((res) => res.json()),
  two: fetch("https://pokeapi.co/api/v2/pokemon/2").then((res) => res.json()),
  three: fetch("https://pokeapi.co/api/v2/pokemon/3").then((res) => res.json()),
});
```

### reduce

Bluebird equivalent: http://bluebirdjs.com/docs/api/promise.reduce.html

This awaits each promise in series and passes the result to the iterator. The final accumulator is returned if all promises resolve successfully.

```ts
import { reduce } from "duckhawk";

const result = await reduce(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  (acc, item) => acc + item,
  0
);

console.log(result); // 6
```

## Notes

We do not plan to achieve 100% parity with bluebird. If you find this library useful and want a feature added, please open an issue :).

## The Why

This is for moving away from bluebird in favor or native Promises and async/await. Some of the bluebird methods are useful and easy to re-implement in native Promises, so we've added the ones we need here.

If you want to replace bluebird with a zero dependency library, this should be a great fit!
