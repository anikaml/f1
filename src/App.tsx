import './App.css';
import Auth from '@aws-amplify/auth'
import AWSAppSyncClient, { AWSAppSyncClientOptions, AUTH_TYPE } from 'aws-appsync'
import AppSyncConfig from './aws-exports'

import { AppContext } from "./libs/contextLib";
import Landing from "./components/Landing";
import { getCircuitsObject } from './data/retrievers'

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
      <div className="App">
        <Landing />
      </div>  
    </AppContext.Provider>
  );
}

export default App;
