import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../../libs/useD3';
import * as topojson from "topojson-client"
import { GeometryObject, Topology } from 'topojson-specification';
import {getUs, getData} from '../../data/data'



export default function WorldMap() {
  const [buttonText, setButtonText] = React.useState(true);

  const ref = useD3(
    async function parowki(svg) {

      let world = await getUs();
      let data = await getData();

      let date: Date | string = Date();
      let projection = d3.geoNaturalEarth1();
      const path = d3.geoPath(projection);
      // let outline = ({ type: "Sphere" });
      let outline: d3.GeoPermissibleObjects = { type: "Sphere" };
      let ppath = path(outline)



      const delay = d3.scaleTime()
        .domain([data[0].date, data[data.length - 1].date])
        .range([0, 20000]);

      // svg.append("path")
      //   .attr("id", "outline")
      //   .attr("fill", "none")
      //   .attr("stroke", "#ddd")
      //   .attr("stroke-width", "2")
      //   .attr("d", ppath);



      svg.append("path")
        .datum(topojson.feature(world, world?.objects.land))
        .attr("fill", "#ddd")
        .attr("d", path);


      svg.append("path")
        .datum(topojson.mesh(
          world,
          (world.objects.countries as unknown) as GeometryObject,
          (a, b) => a !== b)
        )
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);


      // svg.append("path")
      //   .datum(topojson.feature(world, world.objects.countries).features)
      // svg.append("path")
      //   .datum(topojson.merge(world, world.objects.countries.geometries))
      // .attr("fill", "#ddd")
      // .attr("d", path);
      // svg.append("path")
      // .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
      // .attr("fill", "none")
      // .attr("stroke", "white")
      // .attr("stroke-linejoin", "round")
      // .attr("d", path);
      const g = svg.append("g")
        .attr("fill", "red")
        .attr("stroke", "black");

      svg.append("circle")
        .attr("fill", "blue")
        .attr("transform", `translate(${data[0]})`)
        .attr("r", 3);

      for (const d of data) {
        d3.timeout(() => {
          g.append("circle")
            .attr("transform", `translate(${d})`)
            .attr("r", 3)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 0)
            .transition()
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 1);
        }, delay(d.date));
      }

      svg.transition()
        .ease(d3.easeLinear)
        .duration(delay.range()[1])
        .tween("date", () => {
          let dd: [Date, Date] = delay.domain() as [Date, Date]
          const i = d3.interpolateDate(...dd);
          return (t:number) => date = d3.timeDay(i(t));
        });
    },
    // [data.length]
    []
  );





  return (
    <>
      <svg
        ref={(ref as unknown) as React.LegacyRef<SVGSVGElement>}
        style={{
          height: "100vh",
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        {/* <g className="circle" />
            <g className="x-axis" />
            <g className="y-axis" />
            <g className="y2-axis" /> */}
      </svg>
      <div>
        <h1>HELLO</h1>
        <button onClick={() => setButtonText(!buttonText)}>{buttonText.toString()}</button>
        <h1>HELLO</h1>
      </div>
    </>
  );
}