import { useState, useEffect } from "react";
import { Container, Typography, Link } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

import AWSAppSyncClient from 'aws-appsync';
import ChartSelector from "./charts/ChartSelector";
import { combinedRaceCircuit } from '../libs/interfaces';
import DatePickers from "./DatePickers";
import { getRacesWithCircuits } from '../data/retrievers';
import { RaceDate, circuitObject } from '../libs/interfaces';
import { useAppContext, DateContext } from "../libs/contextLib";
import WorldMap from "./map/WorldMap";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Russo One',
    padding: "0.5em",
    color: 'white',
  }, 
  titleDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    background: theme.palette.primary.main,
    width: '100vw',
    borderRadius: '0px 0px 30px 30px',
    marginBottom: '1em'
  },
  emptyDiv: {
    height: "100vh"
  },
  iconButton: {
    color: 'white',
    position: 'absolute',
    right: 50,
  },
  icon: {
    '@media (max-width:700px)': {
      height: '0.5em',
    }
  },
  typography: {
    fontFamily: 'Russo One',
  },
  titleContainer: {
    '@media (max-width:900px)': {
      padding: "0 1em 1em 1em",
    }
  }
}));

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
    components = <div className={classes.emptyDiv}/>
  }

  return (
    <>
      <DateContext.Provider
        value={{ startDate, endDate }}
      >
        <div className={classes.titleDiv}>
          <Typography variant="h3" className={classes.title}>F1 stats</Typography>
          <IconButton 
            aria-label="github"
            component={Link}
            href={`https://github.com/anikaniescierewicz/f1`}
            rel="noopener noreferrer"
            target="_blank"
            className={classes.iconButton}
          >
           <GitHubIcon className={classes.icon}/>
        </IconButton>
        </div>
        <Container maxWidth="md">
          <div className={classes.titleContainer}>
            <Typography className={classes.typography}>
            {' Select start and end dates to see a '}
              <Link href="/#timelapse" style={{ textDecoration: 'none'}}>
                <Typography 
                  variant="h6"
                  display={'inline'}
                >
                  timelapse
                </Typography>
              </Link>
              {' and '}
              <Link href="/#statistics" style={{ textDecoration: 'none'}}>
                <Typography 
                  variant="h6"
                  display={'inline'}
                >
                  statistics
                </Typography>
              </Link>
            {' for F1 races in your chosen period'}
            </Typography>
          </div>
          <div id='timelapse'>
            <DatePickers 
              startDate={startDate}
              endDate={endDate}
              setStartDateChange={setStartDateChange}
              setEndDateChange={setEndDateChange}
            />
          </div>
          {components}
        </Container>
        <Footer />
      </DateContext.Provider>
    </>
  );
}