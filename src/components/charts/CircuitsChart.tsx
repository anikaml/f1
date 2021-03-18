import * as d3 from 'd3';
// import * as topojson from "topojson-client"
// import { GeometryObject } from 'topojson-specification';
// import { Typography } from '@material-ui/core/';

// import { getWorld, getRacesWithCircuits } from '../../data/retrievers';
// import { useAppContext } from "../../libs/contextLib";
import { useD3 } from '../../libs/useD3';
import { useDateContext } from "../../libs/contextLib";
import { GeneralGraphPropsType } from '../../libs/interfaces';
import {getPropertyArray} from '../../utils/helpers'

export default function CircuitsChart({raceData}: GeneralGraphPropsType) {
  const { startDate, endDate } = useDateContext();

  const ref = useD3(
    async function parowki(svg1) {

      const color = "steelblue";
      let data = raceData

      let result = getPropertyArray(data)
      console.log('RESULT', result)
    },
    [startDate, endDate]
  );
//       const data = [5.1, 4.9, 8.6, 6.2, 5.1, 7.1, 6.7, 6.1, 5, 5, 5.2, 7.9, 11.1, 5.9, 5.5, 5.6, 6.5, 7.7, 5.7, 7.9]
// const bins = [
//   [1.9, 1.8, 1.8, 1.7, 1.8, 1.8, 1.9, 1.8, 1.9, 1.6, 1.7, 1.9, 1.9, 1.9, 1.8, 1.9, 1.9, 1.5, 2,{x0: 1, x1: 1.5}],
//   [2.2, 2.4, 2.3, 2.1, 2, 2.3, 2.1, 2.3, 2.4, 2.4, 2.2, 2.1, 2.1, 2.2, 2, 2.3, 2.4, 2.2, 2.4, 2.3, {x0: 2, x1: 2.5}],
//   [2.7, 2.8, 2.6, 2.9, 2.7, 2.8, 2.5, 2.6, 2.6, 2.6, 2.9, 2.9, 2.5, 2.7, 2.7, 2.6, 2.8, 2.6, 2.9, 2.9, {x0: 11, x1: 11.5}],
//   [3.2, 3, 3, 3.2, 3.3, 3.1, 3.2, 3.4, 3.2, 3, 3, 3.2, 3.2, 3.1, 3.1, 3.1, 3.3, 3, 3.2, 3.3, {x0: 11, x1: 11.5}],
//   [3.6, 3.7, 3.9, 3.7, 3.9, 3.9, 3.7, 3.6, 3.8, 3.7, 3.6, 3.8, 3.7, 3.5, 3.7, 3.5, 3.5, 3.5, 3.6, 3.6, {x0: 11, x1: 11.5}],
//    [4.2, 4.4, 4.1, 4.4, 4.4, 4, 4, 4.4, 4.3, 4.4, 4.1, 4.3, 4.4, 4, 4.3, 4, 4.1, 4.3, 4.1, 4.4, {x0: 11, x1: 11.5}],
//   [4.9, 4.8, 4.7, 4.9, 4.9, 4.9, 4.8, 4.9, 4.5, 4.8, 4.5, 4.5, 4.9, 4.5, 4.6, 4.7, 4.7, 4.6, 4.8, 4.8, {x0: 11, x1: 11.5}],
//    [5.1, 5.1, 5, 5, 5.2, 5.4, 5.2, 5, 5.1, 5.2, 5.3, 5, 5.1, 5, 5.4, 5.4, 5.4, 5, 5.1, 5, {x0: 11, x1: 11.5}],
//    [5.9, 5.5, 5.6, 5.7, 5.7, 5.6, 5.7, 5.7, 5.5, 5.6, 5.9, 5.5, 5.6, 5.7, 5.5, 5.6, 5.9, 5.7, 5.8, 5.9, {x0: 11, x1: 11.5}],
//   [6.2, 6.1, 6.3, 6.3, 6, 6.4, 6.1, 6.4, 6.4, 6.4, 6.3, 6, 6.2, 6.4, 6.3, 6.1, 6.2, 6.2, 6.1, 6.2, {x0: 11, x1: 11.5}],
//    [6.7, 6.5, 6.7, 6.6, 6.9, 6.5, 6.7, 6.9, 6.9, 6.5, 6.6, 6.6, 6.6, 6.9, 6.8, 6.6, 6.5, 6.8, 6.9, 6.9, {x0: 11, x1: 11.5}],
//   [7.1, 7.2, 7.3, 7.2, 7, 7.3, 7.4, 7.3, 7, 7.1, 7.3, 7.3, 7.1, 7.1, 7.4, 7.2, 7.2, 7, 7.4, 7.3, {x0: 11, x1: 11.5}],
//    [7.9, 7.7, 7.6, 7.6, 7.7, 7.9, 7.7, 7.9, 7.9, 7.6, 7.5, 7.6, 7.7, 7.5, 7.7, 7.6, 7.6, 7.5, 7.6, 7.9, {x0: 11, x1: 11.5}],
//    [8.3, 8.1, 8.2, 8, 8.3, 8.1, 8.2, 8, 8.1, 8.3, 8.1, 8.4, 8.1, 8.2, 8.1, 8.3, 8.3, 8.3, 8.3, 8.4, {x0: 11, x1: 11.5}],
//    [8.6, 8.6, 8.7, 8.5, 8.7, 8.9, 8.6, 8.9, 8.6, 8.6, 8.5, 8.6, 8.8, 8.7, 8.5, 8.5, 8.9, 8.5, 8.7, 8.8, {x0: 11, x1: 11.5}],
//    [9.3, 9.2, 9.4, 9.2, 9, 9.2, 9, 9, 9.2, 9.4, 9.4, 9.3, 9, 9.2, 9.1, 9, 9, 9.1, 9.4, 9.3, {x0: 11, x1: 11.5}],
//  [9.5, 9.7, 9.6, 9.5, 9.7, 9.5, 9.6, 9.6, 9.7, 9.9, 9.9, 9.9, 9.8, 9.8, 9.7, 9.5, 9.8, 9.9, 9.8, 9.6, {x0: 11, x1: 11.5}],
//    [10.3, 10, 10.4, 10.4, 10.3, 10.4, 10.1, 10.1, 10, 10.4, 10, 10, 10, 10, 10.5, {x0: 9, x1: 9.5}],
//    [10.9, 10.6, 10.6, 10.5, 10.6, 10.5, 10.9, 10.9, 10.7, 10.6, 10.5, 11, {x0: 10, x1: 10.5}],
//    [11.1, 11.2, 11.4, 11.3, 11.3, 11.4, 11.2, 11.2, 11.3, {x0: 11, x1: 11.5}]
//   ]

//     // const bins = d3.bin().thresholds(20)(data)

      // const height = 500;
      // const width = 900;
      // const margin = ({top: 20, right: 30, bottom: 30, left: 40});

      // const y = d3.scaleLinear()
      // // .domain([0, 1])
      // // .range([height - margin.bottom, margin.top])
      // const y = d3.scaleLinear()
      // .domain([0, d3.max(bins, d => d.length)]).nice()
      // .range([height - margin.bottom, margin.top])

      // // const x = d3.scaleLinear()
      // // .domain([0, 1])
      // // .range([margin.left, width - margin.right])

      // const x = d3.scaleLinear()
      // .domain([bins[0].x0, bins[bins.length - 1].x1])
      // .range([margin.left, width - margin.right])

      // const svg = d3.create("svg")
      // .attr("viewBox", [0, 0, width, height]);

    


    //   // const yAxis = (g:any) => g
    //   // .attr("transform", `translate(${margin.left},0)`)
    //   // .call(d3.axisLeft(y))
    //   const yAxis = (g:any) => g
    //     .attr("transform", `translate(${margin.left},0)`)
    //     .call(d3.axisLeft(y).ticks(height / 40))
    //     .call((g:any) => g.select(".domain").remove())
    //     .call((g:any) => g.select(".tick:last-of-type text").clone()
    //     .attr("x", 4)
    //     .attr("text-anchor", "start")
    //     .attr("font-weight", "bold")
    //     .text(data.y))

    //   // const xAxis = (g:any) => g
    //   // .attr("transform", `translate(0,${height - margin.bottom})`)
    //   // .call(d3.axisBottom(x))
    //   const xAxis = (g:any) => g
    // .attr("transform", `translate(0,${height - margin.bottom})`)
    // .call(d3.axisBottom(x).ticks(width / 80 ).tickSizeOuter(0))
    // .call((g:any) => g.append("text")
    //     .attr("x", width - margin.right)
    //     .attr("y", -4)
    //     .attr("fill", "currentColor")
    //     .attr("font-weight", "bold")
    //     .attr("text-anchor", "end")
    //     .text(data.x))

//       svg1.append("g")
//           .call(xAxis);

//       svg1.append("g")
//           .call(yAxis);

      
//       svg1.append("g")
//           .attr("fill", color)
//         .selectAll("rect")
//         .data(bins)
//         .join("rect")
//           .attr("x", d => x(d.x0) + 1)
//           .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
//           .attr("y", d => y(d.length))
//           .attr("height", d => y(0) - y(d.length));
     

//     },
//     []
//   );

  return (
    <>
  {/* <Typography>{topText}</Typography> */}
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
        
      </svg>
    </>
  );
}
