import * as d3 from 'd3';
import { allCircuits, timerangeRaces } from '../graphql/queries';

import { API, graphqlOperation } from "aws-amplify";
import { GraphQLQuery } from '@aws-amplify/api';

import { Topology } from "topojson-specification" ;
import { Circuit, Race, TimerangeRaces } from "../API"
import { circuitObject, combinedRaceCircuit, point } from "../libs/interfaces"


interface apiResponse { 
  objects: {
    land: [],
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

export async function getWorld() {
  const world: apiResponse | undefined = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  return (world as unknown) as Topology;
}

export async function getRaceData(startDate: Date, endDate: Date){
  try {
    const res = await API.graphql<GraphQLQuery<raceApiResponse>>(graphqlOperation(timerangeRaces, {
      "StartDate": startDate.toISOString().substring(0,10),
      "EndDate": endDate.toISOString().substring(0,10)
    }));
    return res.data?.timerangeRaces.races
  } catch(e) {
    console.error(e)
  }
}

export async function getCircuitData() {
  const res = await API.graphql<GraphQLQuery<circuitApiResponse>>(graphqlOperation(allCircuits))
  return res.data?.allCircuits.circuits
}

export async function getCircuitsObject() {
  let circuit_list = await getCircuitData()
  let circuitObject: circuitObject = {};
  if(circuit_list){
    circuit_list.forEach((element: Circuit) => {
      circuitObject[element.id] = element
    })
  }
  return circuitObject
}

export async function getRacesWithCircuits(startDate: Date, endDate: Date, allCircuits: Promise<circuitObject>) {
  let race_list = await getRaceData(startDate, endDate)
  let circuit_list = await allCircuits;
  const projection = d3.geoNaturalEarth1();
  let combinedList: combinedRaceCircuit[] = []
  if(race_list){
    combinedList = race_list.map((race: Race) => {
      let circuitData = circuit_list[race.circuit_id];
      const projectedCoordinates: point = projection([Number(circuitData.longitude), Number(circuitData.latitude)]);
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