# In Flight - duckhawk

Native Promise based implementations of bluebird utilities with zero dependencies and miniature bundle size.

<img src="https://raw.githubusercontent.com/tylersayshi/duckhawk/main/img/falcon.png" alt="Duckie the hawk" width="200" height="200" />

## Docs

### map

Bluebird equivalent: http://bluebirdjs.com/docs/api/promise.map.html

This awaits each promise in parallel and passes the result to the iterator. The result of the iterator is
returned as an array.

```ts
import duckhawk from "duckhawk";

const result = await duckhawk.map(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  (item) => item + 1
);
```

concurrency can be passed to limit the number of promises to run in parallel.

```ts
import duckhawk from "duckhawk";

const result = await duckhawk.map(
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
import duckhawk from "duckhawk";

const result = await duckhawk.mapSeries(
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
import duckhawk from "duckhawk";

const result = await duckhawk.props({
  one: fetch("https://pokeapi.co/api/v2/pokemon/1").then((res) => res.json()),
  two: fetch("https://pokeapi.co/api/v2/pokemon/2").then((res) => res.json()),
  three: fetch("https://pokeapi.co/api/v2/pokemon/3").then((res) => res.json()),
});
```
