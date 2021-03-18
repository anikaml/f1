import * as d3 from 'd3';
import { useD3 } from '../../libs/useD3';
import { useDateContext } from "../../libs/contextLib";
import { GeneralGraphPropsType } from '../../libs/interfaces';
import {getPropertyArray} from '../../utils/helpers'

interface resultType {
  name: string,
  value: number
}

export default function CircuitsChart({raceData}: GeneralGraphPropsType) {
  const { startDate, endDate } = useDateContext();

  const ref = useD3(
    async function parowki(svg) {

    
      const color = "#e10600";
      const height = 500
      const width = 900
      let data = getPropertyArray(raceData).sort((a, b) => d3.descending(a.value, b.value))
      let max: number | undefined = d3.max(data,d => d.value)
      if (!max) { // if d3.max returned undefined (in case of an empty array), set max to 0
        max = 0
      }

      const margin = ({top: 30, right: 0, bottom: 30, left: 40})

      if (data) {
        const y = d3.scaleLinear()
          .domain([0, max]).nice()
          .range([height - margin.bottom, margin.top])

      const x = d3.scaleBand()
        .domain(d3.range(data.length) as any)
        // .domain(d3.range(data.length).map((i) => i.toString()))
        .range([margin.left, width - margin.right])
        .padding(0.1)
      

      const yAxis = (g: d3.Selection<SVGGElement, {}, null, undefined>) => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, ''))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        // .text(data.y))
        .text('upper text'))

      const xAxis = (g: d3.Selection<SVGGElement, {}, null, undefined>) => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3.axisBottom(x)
          .tickFormat(i => data[Number(i)].name)
          .tickSizeOuter(0)
        )
        // .style("text-anchor", "start")
        // .selectAll("text")
        // .style("transform", "rotate(90)")

        // const svg = d3.create("svg")
        // .attr("viewBox", [0, 0, width, height]);
  
      svg.append("g")
        .attr("fill", color)
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (_d, i): any => x(i.toString()))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth());
  
        svg.append("g")
          .call(xAxis)
          .selectAll("text")  
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");
    
        svg.append("g")
          .call(yAxis);
      }

    },
    [startDate, endDate]
  );

  return (
    <>
      <svg
        ref={(ref as unknown) as React.LegacyRef<SVGSVGElement>}
        viewBox="0 0 900 900"
        style={{
          //maxHeight: "100vh",
          // height:"auto",
          // width: "100%",
          // marginRight: "0px",
          // marginLeft: "0px",
          // maxWidth: "-webkit-fill-available",
          //border: '1px solid black'
          overflow: "visible"
        }}
      >
        <g style={{width: '100%'}}></g>
        
      </svg>
    </>
  );
}
