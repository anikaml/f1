import React from 'react'
import * as d3 from 'd3'
import { type RaceDate } from './interfaces'

export const useD3 = (renderChartFn: (arg: d3.Selection<HTMLElement, any, null, undefined>) => Promise<void>, startDate: (RaceDate | undefined), endDate: (RaceDate | undefined)): React.MutableRefObject<HTMLElement> => {
  const ref = React.useRef<HTMLElement>(null!) // eslint-disable-line @typescript-eslint/no-non-null-assertion

  React.useEffect(() => {
    // renderChartFn is a callback that contains your D3.js code to be executed
    renderChartFn(d3.select(ref.current)) // eslint-disable-line @typescript-eslint/no-floating-promises
    return () => { }
  }, [startDate, endDate, renderChartFn]) // dependencies is a fixed-length array to tell React when to run the renderChartFn. This is useful for preventing unnecessary re-rendering and updating the chart correctly when new data arrives.
  return ref
}
