/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type PaginatedCircuits = {
  __typename: "PaginatedCircuits",
  circuits:  Array<Circuit >,
  nextToken?: string | null,
};

export type Circuit = {
  __typename: "Circuit",
  name: string,
  id: number,
  latitude: string,
  longitude: string,
};

export type PaginatedRaces = {
  __typename: "PaginatedRaces",
  races:  Array<Race >,
  nextToken?: string | null,
};

export type Race = {
  __typename: "Race",
  name: string,
  id: number,
  date: string,
  driver_win: Driver,
  constructor_win: Constructor,
  circuit_id: number,
  round?: number,
};

export type Driver = {
  __typename: "Driver",
  name: string,
};

export type Constructor = {
  __typename: "Constructor",
  name: string,
};

export type TimerangeRaces = {
  __typename: "TimerangeRaces",
  races:  Array<Race >,
  nextToken?: string | null,
};

export type AllCircuitsQueryVariables = {
  nextToken?: string | null,
};

export type AllCircuitsQuery = {
  allCircuits:  {
    __typename: "PaginatedCircuits",
    circuits:  Array< {
      __typename: "Circuit",
      name: string,
      id: number,
      latitude: string,
      longitude: string,
    } >,
    nextToken?: string | null,
  },
};

export type GetCircuitQueryVariables = {
  CircuitId?: string,
};

export type GetCircuitQuery = {
  getCircuit?:  {
    __typename: "Circuit",
    name: string,
    id: number,
    latitude: string,
    longitude: string,
  } | null,
};

export type AllRacesQueryVariables = {
  nextToken?: string | null,
};

export type AllRacesQuery = {
  allRaces:  {
    __typename: "PaginatedRaces",
    races:  Array< {
      __typename: "Race",
      name: string,
      id: number,
      date: string,
      circuit_id: number,
      round: number,
    } >,
    nextToken?: string | null,
  },
};

export type TimerangeRacesQueryVariables = {
  nextToken?: string | null,
  StartDate?: string,
  EndDate?: string,
};

export type TimerangeRacesQuery = {
  timerangeRaces:  {
    __typename: "TimerangeRaces",
    races:  Array< {
      __typename: "Race",
      name: string,
      id: number,
      date: string,
      circuit_id: number,
      round: number,
    } >,
    nextToken?: string | null,
  },
};

export type GetRaceQueryVariables = {
  RaceDate?: string,
};

export type GetRaceQuery = {
  getRace?:  {
    __typename: "Race",
    name: string,
    id: number,
    date: string,
    driver_win:  {
      __typename: "Driver",
      name: string,
    },
    constructor_win:  {
      __typename: "Constructor",
      name: string,
    },
    circuit_id: number,
    round: number,
  } | null,
};
