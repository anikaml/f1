import './App.css';
// import Auth from '@aws-amplify/auth'
import { Amplify } from "aws-amplify";

import { AppContext } from "./libs/contextLib";
import AppSyncConfig from './aws-exports'
import { getCircuitsObject } from './data/retrievers'
import Landing from "./components/Landing";
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme';

const amplifyConfig = {
  Auth: {
    region: AppSyncConfig.region,
    identityPoolId: AppSyncConfig.identityPoolId,
  },
  aws_appsync_graphqlEndpoint: AppSyncConfig.graphqlEndpoint,
  aws_appsync_region: AppSyncConfig.region,
  aws_appsync_authenticationType: AppSyncConfig.authenticationType
}

Amplify.configure(amplifyConfig)

const allCircuits = getCircuitsObject()

function App(): JSX.Element {
  return (
    <AppContext.Provider
      value={{ allCircuits }}
    >
      <ThemeProvider theme={theme}>
        <div className="App">
          <Landing />
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
