import * as d3 from 'd3';
import { Topology } from "topojson-specification" 
// export async function getUs() {
//     const us = await d3.json("https://unpkg.com/us-atlas@1/us/10m.json")
//     us.objects.lower48 = {
//     type: "GeometryCollection",
//     geometries: us.objects.states.geometries.filter(d => d.id !== "02" && d.id !== "15")
//   };
//   return us;
// }

interface apiResponse { 
  objects: {
    land: [],
    countries?: []
  }
};

type point = [number, number] & {date?: Date | string | null} | null

type compiledDataPoint = [number, number] & {date: Date}

type compiledDataPoints = compiledDataPoint[]

export async function getUs() {
  const world: apiResponse | undefined = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  return (world as unknown) as Topology;
}

export async function getData() {
  const parseDate = d3.timeParse("%m/%d/%Y");
  const projection = d3.geoNaturalEarth1();
  const dataPoints = await d3.tsv("https://gist.githubusercontent.com/mbostock/4330486/raw/fe47cd0f43281cae3283a5b397f8f0118262bf55/walmart.tsv", d => {
    // console.log(d)
    const p: point = projection([Number(d[0]), Number(d[1])]);
    if ((d.date) && (p)) {
      p.date = parseDate(d.date);
    }
    return p;
  });
  dataPoints.sort((a: point, b: point) => {
    if (a && b && (a.date) && (b.date)) {
      return Number(a.date) - Number(b.date)
    } else {
      return 1
    }
  });
  return (dataPoints as unknown) as compiledDataPoints;
}