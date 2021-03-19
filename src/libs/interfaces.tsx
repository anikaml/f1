import { Circuit, Race} from "../API"

export type RaceDate = Date | null

export interface circuitObject { 
  [id: number]: Circuit
};

export type point = [number, number] | null

export interface combinedRaceCircuit extends Omit<Race, 'date'> { 
  date: Date,
  circuitName: string,
  coordinates: point
};

export interface WorldMapPropsType {
  raceData: Promise<combinedRaceCircuit[]>
}

export interface GraphSelectorPropsType {
  raceData: combinedRaceCircuit[]
}

export interface GeneralGraphPropsType {
  name: string,
  value: number
}

export enum CombinedRaceCircuitPropertyEnum {
  circuitName = "circuitName",
  driver_win = "driver_win",
  constructor_win = "constructor_win",
}