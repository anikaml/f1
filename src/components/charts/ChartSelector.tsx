import { useState } from "react";
import * as d3 from 'd3';
import { Button, Typography } from '@material-ui/core/';

import { GraphSelectorPropsType, CombinedRaceCircuitPropertyEnum } from '../../libs/interfaces';
import {getPropertyArray} from '../../utils/helpers'
import BarChart from './BarChart';

export default function ChartSelector({raceData}: GraphSelectorPropsType) {
  const [selectedButton, setSelectedButton] = useState(CombinedRaceCircuitPropertyEnum.circuitName)

  let allData = {
    [CombinedRaceCircuitPropertyEnum.circuitName]: getPropertyArray(raceData, CombinedRaceCircuitPropertyEnum.circuitName).sort((a, b) => d3.descending(a.value, b.value)),
    [CombinedRaceCircuitPropertyEnum.driver_win]: getPropertyArray(raceData, CombinedRaceCircuitPropertyEnum.driver_win).sort((a, b) => d3.descending(a.value, b.value)),
    [CombinedRaceCircuitPropertyEnum.constructor_win]: getPropertyArray(raceData, CombinedRaceCircuitPropertyEnum.constructor_win).sort((a, b) => d3.descending(a.value, b.value))
  }

  return (
    <>
    <Typography>{selectedButton}</Typography>
      <Button 
        variant='contained'
        onClick={() => setSelectedButton(CombinedRaceCircuitPropertyEnum.circuitName)}
        color={selectedButton === CombinedRaceCircuitPropertyEnum.circuitName? 'primary' : 'secondary'}
      >
        Circuits
      </Button>
      <Button 
        variant='contained'
        onClick={() => setSelectedButton(CombinedRaceCircuitPropertyEnum.driver_win)}
        color={selectedButton === CombinedRaceCircuitPropertyEnum.driver_win? 'primary' : 'secondary'}
      >
        Drivers
      </Button>
      <Button 
        variant='contained'
        onClick={() => setSelectedButton(CombinedRaceCircuitPropertyEnum.constructor_win)}
        color={selectedButton === CombinedRaceCircuitPropertyEnum.constructor_win? 'primary' : 'secondary'}
      >
        Constructors
      </Button>
      <BarChart
        key={selectedButton}
        data={allData[selectedButton]}
        yAxisText={'Races'}
      />
    </>
  )
}