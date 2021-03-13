import { useState, useEffect } from "react";

import { useAppContext } from "../libs/contextLib";
import { getRacesWithCircuits } from '../data/retrievers';
import DatePickers from "./DatePickers";
import WorldMap from "./map/WorldMap";

export default function RaceList(): JSX.Element {
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
    </>
  );
}