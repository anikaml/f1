import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Container, IconButton, Typography, Link } from '@mui/material/';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChartSelector from "./charts/ChartSelector";
import { combinedRaceCircuit } from '../libs/interfaces';
import DatePickers from "./DatePickers";
import { getRacesWithCircuits } from '../data/retrievers';
import { RaceDate, circuitObject } from '../libs/interfaces';
import { useAppContext, DateContext } from "../libs/contextLib";
import WorldMap from "./map/WorldMap";
import Footer from "./Footer";

const PREFIX = 'Landing';

const classes = {
  title: `${PREFIX}-title`,
  titleDiv: `${PREFIX}-titleDiv`,
  emptyDiv: `${PREFIX}-emptyDiv`,
  iconButton: `${PREFIX}-iconButton`,
  icon: `${PREFIX}-icon`,
  typography: `${PREFIX}-typography`,
  typographyLink: `${PREFIX}-typographyLink`,
  titleContainer: `${PREFIX}-titleContainer`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.title}`]: {
    fontFamily: 'Russo One',
    padding: "0.5em",
    color: 'white',
  },

  [`& .${classes.titleDiv}`]: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    background: theme.palette.primary.main,
    width: '100vw',
    borderRadius: '0px 0px 30px 30px',
    marginBottom: '1em'
  },

  [`& .${classes.emptyDiv}`]: {
    height: "100vh"
  },

  [`& .${classes.iconButton}`]: {
    color: 'white',
    position: 'absolute',
    right: 50,
  },

  [`& .${classes.icon}`]: {
    '@media (max-width:700px)': {
      height: '0.5em',
    }
  },

  [`& .${classes.typography}`]: {
    fontFamily: 'Russo One',
  },

  [`& .${classes.typographyLink}`]: {
    fontFamily: 'Russo One',
    padding: '0 0.25em',
  },

  [`& .${classes.titleContainer}`]: {
    '@media (max-width:900px)': {
      padding: "0 1em 1em 1em",
    },
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function RaceList(): JSX.Element {

  const { allCircuits } = useAppContext();
  const [startDate, setStartDateChange] = useState<Date | null>(new Date("2010-03-02"));
  const [endDate, setEndDateChange] = useState<Date | null>(new Date());
  const [raceData, setRaceData] = useState<combinedRaceCircuit[]>([])
  const [initialLoad, setInitialLoad] = useState<boolean>(true)

  useEffect(() => {
    if (startDate && endDate && allCircuits){
      getSetRaceData(startDate, endDate, allCircuits)
    }
  }, [startDate, endDate, allCircuits]);

  async function getSetRaceData(startDate: RaceDate, endDate: RaceDate, allCircuits: Promise<circuitObject>) {
    if (startDate && endDate && allCircuits){
      let data = await getRacesWithCircuits(startDate, endDate, allCircuits)
      setRaceData(data)
      setInitialLoad(false)
    }
  }

  let components;
  if (raceData.length !== 0) {
    components = ((<>
      <WorldMap raceData={raceData} />
      <ChartSelector raceData={raceData}/>
    </>))
  } else if (!initialLoad) {
    components = <Typography variant="h6">No races found. Please select different dates</Typography>
  } else {
    components = <div className={classes.emptyDiv}/>
  }

  return (
    <Root>
      <DateContext.Provider
        value={{ startDate, endDate }}
      >
        <div className={classes.titleDiv}>
          <Typography variant="h3" className={classes.title}>F1 stats</Typography>
          <IconButton 
            aria-label="github"
            component={Link}
            href={`https://github.com/anikaml/f1`}
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
            </Typography>
            <Link href="/#timelapse" style={{ textDecoration: 'none'}}>
              <Typography
                className={classes.typographyLink}
                variant="h6"
                display={'inline'}
              >
                timelapse
              </Typography>
            </Link>
            <Typography className={classes.typography}>
              {' and '}
            </Typography>
            <Link href="/#statistics" style={{ textDecoration: 'none'}}>
              <Typography
                className={classes.typographyLink}
                variant="h6"
                display={'inline'}
              >
                statistics
              </Typography>
            </Link>
            <Typography className={classes.typography}>
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
    </Root>
  );
}