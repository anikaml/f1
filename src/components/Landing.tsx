import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Container, IconButton, Typography, Link, CircularProgress } from '@mui/material/'
import GitHubIcon from '@mui/icons-material/GitHub'
import ChartSelector from './charts/ChartSelector'
import { type combinedRaceCircuit, type circuitObject, type RaceDate } from '../libs/interfaces'
import DatePickers from './DatePickers'
import { getRacesWithCircuits } from '../data/retrievers'
import { useAppContext, DateContext } from '../libs/contextLib'
import { isValidRaceDate } from '../utils/helpers'
import { DEFAULT_START_DATE, MIN_START_DATE } from '../utils/consts'
import WorldMap from './map/WorldMap'
import Footer from './Footer'

const PREFIX = 'Landing'

const classes = {
  title: `${PREFIX}-title`,
  titleDiv: `${PREFIX}-titleDiv`,
  emptyDiv: `${PREFIX}-emptyDiv`,
  iconButton: `${PREFIX}-iconButton`,
  icon: `${PREFIX}-icon`,
  typography: `${PREFIX}-typography`,
  typographyLink: `${PREFIX}-typographyLink`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`
}

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.title}`]: {
    padding: '0.5em',
    color: 'white'
  },

  [`& .${classes.titleDiv}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.primary.main,
    width: '100vw',
    borderRadius: '0px 0px 30px 30px',
    marginBottom: '1em'
  },

  [`& .${classes.emptyDiv}`]: {
    height: '100vh'
  },

  [`& .${classes.iconButton}`]: {
    color: 'white',
    position: 'absolute',
    right: 50
  },

  [`& .${classes.icon}`]: {
    '@media (max-width:700px)': {
      height: '0.5em'
    }
  },

  [`& .${classes.typographyLink}`]: {
    padding: '0 0.25em'
  },

  [`& .${classes.titleContainer}`]: {
    '@media (max-width:900px)': {
      padding: '0 1em 1em 1em'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },

  [`& .${classes.container}`]: {
    height: '100%',
    minHeight: '100vh'
  }
}))

export default function RaceList(): React.JSX.Element {
  const { allCircuits } = useAppContext()
  const [startDate, setStartDateChange] = useState<RaceDate>(new Date(DEFAULT_START_DATE))
  const [endDate, setEndDateChange] = useState<RaceDate>(new Date())
  const [raceData, setRaceData] = useState<combinedRaceCircuit[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    setIsLoading(true)
    validateAndFetch(startDate, endDate, allCircuits) // eslint-disable-line @typescript-eslint/no-floating-promises
  }, [startDate, endDate, allCircuits])

  async function validateAndFetch(startDate: RaceDate, endDate: RaceDate, allCircuits: Promise<circuitObject> | undefined): Promise<void> {
    const allCircuitsResults = await allCircuits
    const error = validateInputs(startDate, endDate, allCircuitsResults)
    if (error !== '') {
      setErrorMessage(error)
    } else if (startDate !== null && endDate !== null && allCircuitsResults !== undefined) { // check is unnecessary here since isValidRaceDate validates if value is null but eslint was complaining
      await getRaceData(startDate, endDate, allCircuitsResults)
      setErrorMessage('')
    }
    setIsLoading(false)
  }

  function validateInputs(startDate: RaceDate, endDate: RaceDate, allCircuitsResults: circuitObject | undefined): string {
    let error = ''
    if (allCircuitsResults === undefined || Object.keys(allCircuitsResults).length === 0) {
      error = 'Circuit data not available'
    } else if (!isValidRaceDate(startDate, new Date(MIN_START_DATE))) {
      error = 'Invalid Start Date specified'
    } else if (!isValidRaceDate(endDate, startDate)) {
      error = 'Invalid End Date specified'
    }
    return error
  }

  async function getRaceData(startDate: Date, endDate: Date, allCircuits: circuitObject): Promise<void> {
    const data = await getRacesWithCircuits(startDate, endDate, allCircuits)
    setRaceData(data)
  }

  let components
  if (errorMessage !== '') {
    components = <Typography variant="h6">{errorMessage}</Typography>
  } else if (isLoading) {
    components = <div className={classes.emptyDiv}><CircularProgress /></div>
  } else if (raceData.length !== 0) {
    components = (<>
      <WorldMap raceData={raceData} />
      <ChartSelector raceData={raceData} />
    </>)
  } else {
    components = <Typography variant="h6">{'No races found. Please select different dates'}</Typography>
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
            href={'https://github.com/anikaml/f1'}
            rel="noopener noreferrer"
            target="_blank"
            className={classes.iconButton}
          >
            <GitHubIcon className={classes.icon} />
          </IconButton>
        </div>
        <Container maxWidth="md" className={classes.container}>
          <div className={classes.titleContainer}>
            <Typography>
              {' Select start and end dates to see a '}
            </Typography>
            <Link href="/#timelapse" style={{ textDecoration: 'none' }}>
              <Typography
                className={classes.typographyLink}
                variant="h6"
                display={'inline'}
              >
                timelapse
              </Typography>
            </Link>
            <Typography>
              {' and '}
            </Typography>
            <Link href="/#statistics" style={{ textDecoration: 'none' }}>
              <Typography
                className={classes.typographyLink}
                variant="h6"
                display={'inline'}
              >
                statistics
              </Typography>
            </Link>
            <Typography>
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
  )
}
