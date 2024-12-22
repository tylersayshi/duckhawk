import { allChunked } from "./all-chunked.ts";
import { map } from "./map.ts";
import { mapSeries } from "./map-series.ts";
import { props } from "./props.ts";
import { reduce } from "./reduce.ts";

const all = { allChunked, map, mapSeries, props, reduce };
export default all;
