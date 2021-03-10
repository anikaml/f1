import React, { useState, useEffect} from "react";
import { allCircuits } from './graphql/queries'
import { useAppContext } from "./libs/contextLib";
import gql from 'graphql-tag';

import { Circuit } from "./API"

interface apiResponse { 
  data: {
    allCircuits: {
      circuits: Circuit[]
    }
  }
};

export default function CircutList(): JSX.Element {
  const { appSyncClient } = useAppContext();
  const [circuits, setCircuits] = useState<Circuit[]>([]);

  async function getCircuitData() {
    if (appSyncClient) {
      let res: apiResponse = await appSyncClient.query({
        query: gql(allCircuits)
      })
      setCircuits(res.data.allCircuits.circuits)
    }
  }

  useEffect(() => {
    getCircuitData()
  }, []);

  const listItems = circuits.map((circuit: Circuit) =>
    circuit && (<li key={circuit.id.toString()}>
      {circuit.name}
    </li>)
  );

  return (
    <div >
      {listItems}
    </div>
  );
}