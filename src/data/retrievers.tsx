import * as d3 from 'd3'
import { allCircuits, timerangeRaces } from '../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import { type GraphQLQuery } from '@aws-amplify/api'
import { type Topology } from 'topojson-specification'
import { type Circuit, type Race, type TimerangeRaces } from '../API'
import { type circuitObject, type combinedRaceCircuit, type point } from '../libs/interfaces'

interface apiResponse {
  objects: {
    land: []
    countries?: []
  }
};

interface raceApiResponse {
  timerangeRaces: TimerangeRaces
};

interface circuitApiResponse {
  allCircuits: {
    circuits: Circuit[]
  }
};

export async function getWorld(): Promise<Topology> {
  const world: apiResponse | undefined = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  return (world as unknown) as Topology
}

export async function getRaceData(startDate: Date, endDate: Date): Promise<Race[] | undefined> {
  try {
    const res = await API.graphql<GraphQLQuery<raceApiResponse>>(graphqlOperation(timerangeRaces, {
      StartDate: startDate.toISOString().substring(0, 10),
      EndDate: endDate.toISOString().substring(0, 10)
    }))
    return res.data?.timerangeRaces.races
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getCircuitData(): Promise<Circuit[] | undefined> {
  const res = await API.graphql<GraphQLQuery<circuitApiResponse>>(graphqlOperation(allCircuits))
  return res.data?.allCircuits.circuits
}

export async function getCircuitsObject(): Promise<circuitObject> {
  const circuitObject: circuitObject = {}
  try {
    const circuitList = await getCircuitData()
    if (circuitList !== undefined) {
      circuitList.forEach((element: Circuit) => {
        circuitObject[element.id] = element
      })
    }
    return circuitObject
  } catch (err) {
    console.error(err)
    return circuitObject
  }
}

export async function getRacesWithCircuits(startDate: Date, endDate: Date, circuitList: circuitObject): Promise<combinedRaceCircuit[]> {
  const raceList = await getRaceData(startDate, endDate)
  const projection = d3.geoNaturalEarth1()
  let combinedList: combinedRaceCircuit[] = []
  if (raceList !== undefined) {
    combinedList = raceList.map((race: Race) => {
      const circuitData = circuitList[race.circuit_id]
      const projectedCoordinates: point = projection([Number(circuitData.longitude), Number(circuitData.latitude)])
      return {
        ...race,
        date: new Date(race.date),
        circuitName: circuitData.name,
        coordinates: projectedCoordinates
      }
    })
  }
  return combinedList
}
