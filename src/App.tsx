import './App.css';
import Auth from '@aws-amplify/auth'
import AWSAppSyncClient, { AWSAppSyncClientOptions, AUTH_TYPE } from 'aws-appsync'

import { AppContext } from "./libs/contextLib";
import AppSyncConfig from './aws-exports'
import { getCircuitsObject } from './data/retrievers'
import Landing from "./components/Landing";
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';


Auth.configure({
  region: 'us-west-2',
  identityPoolId: "us-west-2:88fd97d7-2549-4676-8364-cb953e6aa9b5",
})

const appSyncConfig: AWSAppSyncClientOptions = {
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials()
  },
  disableOffline: true // https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/102
}

const appSyncClient = new AWSAppSyncClient(appSyncConfig)
const allCircuits = getCircuitsObject(appSyncClient)

function App(): JSX.Element {

  return (
    <AppContext.Provider
      value={{ appSyncClient, allCircuits }}
    >
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <Landing />
      </div>  
      </MuiThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
