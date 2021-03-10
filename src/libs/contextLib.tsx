import { useContext, createContext } from "react";
import AWSAppSyncClient from 'aws-appsync'


interface ContextProps { 
  appSyncClient: AWSAppSyncClient<any>
};

export const AppContext = createContext<Partial<ContextProps>>({});

export function useAppContext() {
  return useContext(AppContext);
}