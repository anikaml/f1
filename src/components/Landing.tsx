import { useState, useEffect } from "react";
import {Container, Typography} from '@material-ui/core/';

import { useAppContext, DateContext } from "../libs/contextLib";
import { combinedRaceCircuit } from '../libs/interfaces';
import { getRacesWithCircuits } from '../data/retrievers';
import AWSAppSyncClient from 'aws-appsync';

import DatePickers from "./DatePickers";
import WorldMap from "./map/WorldMap";
import { makeStyles } from "@material-ui/styles";
import {RaceDate, circuitObject} from '../libs/interfaces';
import ChartSelector from "./charts/ChartSelector";

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
  const [raceData, setRaceData] = useState<combinedRaceCircuit[]>([])
  const [initialLoad, setInitialLoad] = useState<boolean>(true)

  useEffect(() => {
    if (startDate && endDate && allCircuits){
      getSetRaceData(appSyncClient, startDate, endDate, allCircuits)
    }
  }, [startDate, endDate, appSyncClient, allCircuits]);

  async function getSetRaceData(appSyncClient: AWSAppSyncClient<any> | undefined, startDate: RaceDate, endDate: RaceDate, allCircuits: Promise<circuitObject>) {
    if (appSyncClient && startDate && endDate && allCircuits){
      let data = await getRacesWithCircuits(appSyncClient, startDate, endDate, allCircuits)
      setRaceData(data)
      setInitialLoad(false)
    }
  }

  let components;
  if (raceData.length !== 0) {
    components = (<>
                    <WorldMap raceData={raceData} />
                    <ChartSelector raceData={raceData}/>
                  </>)
  } else if (!initialLoad) {
    components = <Typography variant="h6">No races found. Please select different dates</Typography>
  } else {
    components = undefined
  }

  return (
    <>
      <DateContext.Provider
        value={{ startDate, endDate }}
      >
        <Container maxWidth="md">
        <Typography variant="h3" className={classes.title}>F1 stats</Typography>
          <DatePickers 
            startDate={startDate}
            endDate={endDate}
            setStartDateChange={setStartDateChange}
            setEndDateChange={setEndDateChange}
          />
          {components}
        </Container>
      </DateContext.Provider>
    </>
  );
}