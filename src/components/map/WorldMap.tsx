import React from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { type GeometryObject } from 'topojson-specification'
import { useDateContext } from '../../libs/contextLib'
import { getWorld } from '../../data/retrievers'
import { type GraphSelectorPropsType } from '../../libs/interfaces'
import { useD3 } from '../../libs/useD3'

export default function WorldMap({ raceData }: GraphSelectorPropsType): React.JSX.Element {
  const { startDate, endDate } = useDateContext()

  const ref = useD3(
    async function paint(svg) {
      d3.selectAll('g').remove()
      d3.selectAll('circle').remove()
      d3.selectAll('text').remove()

      const world = await getWorld()
      const data = raceData

      let date: Date | string = Date() // eslint-disable-line @typescript-eslint/no-unused-vars
      const projection = d3.geoNaturalEarth1()
      const path = d3.geoPath(projection)
      const ppath = path({ type: 'Sphere' })

      const delay = d3.scaleTime()
        .domain([data[0].date, data[data.length - 1].date])
        .range([0, 1400 * data.length])

      svg.append('path')
        .attr('id', 'outline')
        .attr('fill', 'none')
        .attr('stroke', '#ddd')
        .attr('stroke-width', '2')
        .attr('d', () => ppath)

      svg.append('path')
        .datum(topojson.feature(world, world?.objects.land))
        .attr('fill', '#ddd')
        .attr('d', path)

      svg.append('path')
        .datum(topojson.mesh(
          world,
          (world.objects.countries as unknown) as GeometryObject,
          (a, b) => a !== b)
        )
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-linejoin', 'round')
        .attr('d', path)

      const g = svg.append('g')
        .attr('fill', 'black')
        .attr('stroke', 'black')

      const t = svg.append('text')
        .text('elo')
        .attr('stroke', 'black')
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1)

      svg.append('circle')
        .attr('fill', 'blue')
        .attr('transform', `translate(${data[0].coordinates})`)
        .attr('r', 3)

      for (const d of data) {
        d3.timeout(() => {
          g.append('circle')
            .attr('transform', `translate(${d.coordinates})`)
            .attr('r', 3)
            .attr('fill-opacity', 1)
            .attr('stroke-opacity', 0)
            .transition()
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 1)

          g.append('text')
            .text(d.circuitName)
            .attr('transform', `translate(${d.coordinates})`)
            .attr('fill-opacity', 1)
            .attr('stroke-opacity', 1)
            .transition()
            .delay(800)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)

          t.text(d.date.toISOString().substring(0, 10) + ' ' + d.name)
            .attr('transform', 'translate(330, -15)')
            .style('font-size', '20px')
            .style('font-family', 'Russo One')
            .style('margin-bottom', 20)
        }, delay(d.date))
      }

      svg.transition()
        .ease(d3.easeLinear)
        .duration(delay.range()[1])
        .tween('date', () => {
          const dd: [Date, Date] = delay.domain() as [Date, Date]
          const i = d3.interpolateDate(...dd)
          return (t: number) => {
            date = d3.timeDay(i(t))
          }
        })
    },
    startDate,
    endDate
  )

  return (
    <>
      <svg
        ref={(ref as unknown) as React.LegacyRef<SVGSVGElement>}
        viewBox="0 0 960 500"
        style={{
          overflow: 'visible'
        }}
      >
      </svg>
    </>
  )
}
