import { useState } from "react";
import * as d3 from 'd3';
import { Button, Container, Typography } from '@material-ui/core/';
import { makeStyles } from "@material-ui/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GraphSelectorPropsType, CombinedRaceCircuitPropertyEnum } from '../../libs/interfaces';
import {getPropertyArray} from '../../utils/helpers'
import BarChart from './BarChart';
import theme from "../../utils/theme";

const useStyles = makeStyles({
  button: {
    borderRadius: 15,
    fontFamily: "Russo One",
    width: 'auto'
  },
  buttonMobile: {
    fontSize: 'small'
  },
  container: {
    display: 'flex',
    padding: "0 0.5em",
    margin: "1em 0",
    justifyContent: "center",
  },
  typography: {
    margin: '1em 0',
    fontFamily: "Russo One",
    letterSpacing: 10,
    fontWeight: 700
  }
});

export default function ChartSelector({raceData}: GraphSelectorPropsType) {
  const classes = useStyles();
  const [selectedButton, setSelectedButton] = useState(CombinedRaceCircuitPropertyEnum.circuitName)
  const breakpointSM = useMediaQuery(theme.breakpoints.up('sm'));

  let allData = {
    [CombinedRaceCircuitPropertyEnum.circuitName]: getPropertyArray(raceData, CombinedRaceCircuitPropertyEnum.circuitName).sort((a, b) => d3.descending(a.value, b.value)),
    [CombinedRaceCircuitPropertyEnum.driver_win]: getPropertyArray(raceData, CombinedRaceCircuitPropertyEnum.driver_win).sort((a, b) => d3.descending(a.value, b.value)),
    [CombinedRaceCircuitPropertyEnum.constructor_win]: getPropertyArray(raceData, CombinedRaceCircuitPropertyEnum.constructor_win).sort((a, b) => d3.descending(a.value, b.value))
  }

  return (
    <>
      <Typography id='statistics' variant='h6' className={classes.typography}>Statistics</Typography>
      <Container maxWidth="lg" className={classes.container}>
        <Button 
          variant='contained'
          onClick={() => setSelectedButton(CombinedRaceCircuitPropertyEnum.circuitName)}
          color={selectedButton === CombinedRaceCircuitPropertyEnum.circuitName? 'primary' : 'secondary'}
          className={breakpointSM? classes.button : classes.buttonMobile + ' ' + classes.button}
          size={breakpointSM? 'medium': 'small'}
          disabled={selectedButton === CombinedRaceCircuitPropertyEnum.circuitName}
        >
          Circuits
        </Button>
        <Button 
          variant='contained'
          onClick={() => setSelectedButton(CombinedRaceCircuitPropertyEnum.driver_win)}
          color={selectedButton === CombinedRaceCircuitPropertyEnum.driver_win? 'primary' : 'secondary'}
          className={breakpointSM? classes.button : classes.buttonMobile + ' ' + classes.button}
          size={breakpointSM? 'medium': 'small'}
          disabled={selectedButton === CombinedRaceCircuitPropertyEnum.driver_win}
          style={{margin: "0 0.5em"}}
        >
          Drivers
        </Button>
        <Button 
          variant='contained'
          onClick={() => setSelectedButton(CombinedRaceCircuitPropertyEnum.constructor_win)}
          color={selectedButton === CombinedRaceCircuitPropertyEnum.constructor_win? 'primary' : 'secondary'}
          className={breakpointSM? classes.button : classes.buttonMobile + ' ' + classes.button}
          size={breakpointSM? 'medium': 'small'}
          disabled={selectedButton === CombinedRaceCircuitPropertyEnum.constructor_win}
        >
          Constructors
        </Button>
      </Container>
      <BarChart
        key={selectedButton}
        data={allData[selectedButton]}
        yAxisText={'Races'}
      />
    </>
  )
}