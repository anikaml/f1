import { useState } from "react";
import { styled } from '@mui/material/styles';
import * as d3 from 'd3';
import { Button, Container, Typography, useMediaQuery } from '@mui/material/';
import { GraphSelectorPropsType, CombinedRaceCircuitPropertyEnum } from '../../libs/interfaces';
import { getPropertyArray } from '../../utils/helpers'
import BarChart from './BarChart';
import theme from "../../utils/theme";

const PREFIX = 'ChartSelector';

const classes = {
  button: `${PREFIX}-button`,
  buttonMobile: `${PREFIX}-buttonMobile`,
  container: `${PREFIX}-container`,
  typography: `${PREFIX}-typography`
};

const Root = styled('div')({
  [`& .${classes.button}`]: {
    borderRadius: 15,
    fontFamily: "Russo One",
    width: 'auto'
  },
  [`& .${classes.buttonMobile}`]: {
    fontSize: 'small'
  },
  [`& .${classes.container}`]: {
    display: 'flex',
    padding: "0 0.5em",
    margin: "1em 0",
    justifyContent: "center",
  },
  [`& .${classes.typography}`]: {
    margin: '1em 0',
    fontFamily: "Russo One",
    letterSpacing: 10,
    fontWeight: 700
  }
});

export default function ChartSelector({ raceData }: GraphSelectorPropsType) {

  const [selectedButton, setSelectedButton] = useState(CombinedRaceCircuitPropertyEnum.circuitName)
  const breakpointSM = useMediaQuery(theme.breakpoints.up('sm'));

  let allData = {
    [CombinedRaceCircuitPropertyEnum.circuitName]: getPropertyArray(raceData, CombinedRaceCircuitPropertyEnum.circuitName).sort((a, b) => d3.descending(a.value, b.value)),
    [CombinedRaceCircuitPropertyEnum.driver_win]: getPropertyArray(raceData, CombinedRaceCircuitPropertyEnum.driver_win).sort((a, b) => d3.descending(a.value, b.value)),
    [CombinedRaceCircuitPropertyEnum.constructor_win]: getPropertyArray(raceData, CombinedRaceCircuitPropertyEnum.constructor_win).sort((a, b) => d3.descending(a.value, b.value))
  }

  return (
    <Root>
      <Typography id='statistics' variant='h6' className={classes.typography}>Statistics</Typography>
      <Container maxWidth="lg" className={classes.container}>
        <Button
          variant='contained'
          onClick={() => setSelectedButton(CombinedRaceCircuitPropertyEnum.circuitName)}
          color={selectedButton === CombinedRaceCircuitPropertyEnum.circuitName ? 'primary' : 'secondary'}
          className={breakpointSM ? classes.button : classes.buttonMobile + ' ' + classes.button}
          size={breakpointSM ? 'medium' : 'small'}
          disabled={selectedButton === CombinedRaceCircuitPropertyEnum.circuitName}
        >
          Circuits
        </Button>
        <Button
          variant='contained'
          onClick={() => setSelectedButton(CombinedRaceCircuitPropertyEnum.driver_win)}
          color={selectedButton === CombinedRaceCircuitPropertyEnum.driver_win ? 'primary' : 'secondary'}
          className={breakpointSM ? classes.button : classes.buttonMobile + ' ' + classes.button}
          size={breakpointSM ? 'medium' : 'small'}
          disabled={selectedButton === CombinedRaceCircuitPropertyEnum.driver_win}
          style={{ margin: "0 0.5em" }}
        >
          Drivers
        </Button>
        <Button
          variant='contained'
          onClick={() => setSelectedButton(CombinedRaceCircuitPropertyEnum.constructor_win)}
          color={selectedButton === CombinedRaceCircuitPropertyEnum.constructor_win ? 'primary' : 'secondary'}
          className={breakpointSM ? classes.button : classes.buttonMobile + ' ' + classes.button}
          size={breakpointSM ? 'medium' : 'small'}
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
    </Root>
  );
}