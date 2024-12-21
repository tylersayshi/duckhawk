# In Flight - duckhawk

Native Promise based implementations of bluebird utilities.

<img src="https://raw.githubusercontent.com/tylersayshi/duckhawk/main/img/falcon.png" alt="Duckie the hawk" width="200" height="200" />

## Docs

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
