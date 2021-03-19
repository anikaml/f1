import { useContext, createContext } from "react";
import AWSAppSyncClient from 'aws-appsync'
import {circuitObject, RaceDate} from '../libs/interfaces'

interface ContextProps { 
  appSyncClient: AWSAppSyncClient<any>,
  allCircuits: Promise<circuitObject>
};

export const AppContext = createContext<Partial<ContextProps>>({});

export function useAppContext() {
  return useContext(AppContext);
}

interface DateContextProps { 
  startDate: RaceDate,
  endDate: RaceDate
};

export const DateContext = createContext<Partial<DateContextProps>>({});

export function useDateContext() {
  return useContext(DateContext);
}