/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allCircuits = /* GraphQL */ `
  query AllCircuits($nextToken: String) {
    allCircuits(nextToken: $nextToken) {
      circuits {
        name
        id
        latitude
        longitude
      }
      nextToken
    }
  }
`;
export const getCircuit = /* GraphQL */ `
  query GetCircuit($CircuitId: ID!) {
    getCircuit(CircuitId: $CircuitId) {
      name
      id
      latitude
      longitude
    }
  }
`;
export const allRaces = /* GraphQL */ `
  query AllRaces($nextToken: String) {
    allRaces(nextToken: $nextToken) {
      races {
        name
        id
        date
        driver_win {
          name
        }
        constructor_win {
          name
        }
        circuit_id
        round
      }
      nextToken
    }
  }
`;
export const timerangeRaces = /* GraphQL */ `
  query TimerangeRaces(
    $nextToken: String
    $StartDate: String!
    $EndDate: String!
  ) {
    timerangeRaces(
      nextToken: $nextToken
      StartDate: $StartDate
      EndDate: $EndDate
    ) {
      races {
        name
        id
        date
        driver_win {
          name
        }
        constructor_win {
          name
        }
        circuit_id
        round
      }
      nextToken
    }
  }
`;
export const getRace = /* GraphQL */ `
  query GetRace($RaceDate: ID!) {
    getRace(RaceDate: $RaceDate) {
      name
      id
      date
      driver_win {
        name
      }
      constructor_win {
        name
      }
      circuit_id
      round
    }
  }
`;
