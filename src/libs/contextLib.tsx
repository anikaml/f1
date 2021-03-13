import { useContext, createContext } from "react";
import AWSAppSyncClient from 'aws-appsync'
import {circuitObject} from '../data/retrievers'

interface ContextProps { 
  appSyncClient: AWSAppSyncClient<any>,
  allCircuits: Promise<circuitObject>
};

export const AppContext = createContext<Partial<ContextProps>>({});

export function useAppContext() {
  return useContext(AppContext);
}