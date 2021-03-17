import { useState, useEffect } from "react";
import {Container, Typography} from '@material-ui/core/';

import { useAppContext } from "../libs/contextLib";
import { getRacesWithCircuits } from '../data/retrievers';
import DatePickers from "./DatePickers";
import WorldMap from "./map/WorldMap";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  title: {
    fontFamily: 'Russo One',
  }
});

export default function RaceList(): JSX.Element {
  const classes = useStyles();
  const { appSyncClient, allCircuits } = useAppContext();
  const [startDate, setStartDateChange] = useState<Date | null>(new Date("2010-03-02"));
  const [endDate, setEndDateChange] = useState<Date | null>(new Date());

  useEffect(() => {
    if (startDate && endDate && allCircuits){
      getRacesWithCircuits(appSyncClient, startDate, endDate, allCircuits)
    }
  }, [startDate, endDate]);

  return (
    <>
      <Container maxWidth="md">
      <Typography variant="h3" className={classes.title}>F1 stats</Typography>
        <DatePickers 
          startDate={startDate}
          endDate={endDate}
          setStartDateChange={setStartDateChange}
          setEndDateChange={setEndDateChange}
        />
        <WorldMap 
          startDate={startDate}
          endDate={endDate}
        />
      </Container>
     
    </>
  );
}