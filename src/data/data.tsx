import * as d3 from 'd3'
import { type Topology } from 'topojson-specification'

interface apiResponse {
  objects: {
    land: []
    countries?: []
  }
};

export async function getUs(): Promise<Topology> {
  const world: apiResponse | undefined = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  return (world as unknown) as Topology
}
