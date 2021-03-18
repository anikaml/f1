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

export interface GeneralGraphPropsType {
  raceData: combinedRaceCircuit[]
}