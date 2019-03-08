import { AWSAppSyncClient } from 'aws-appsync'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
const REGION = 'us-west-2'
const APPSYNC_URI =
  'https://24dcgvqyubdzje2wagfun6zleu.appsync-api.us-west-2.amazonaws.com/graphql'
const APPSYNC_APIKEY = 'da2-adpu4px64ze7fof37tvbk2n254'

const httpLink = createHttpLink({
  uri: APPSYNC_URI
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      'x-api-key': APPSYNC_APIKEY
    }
  }
})

export default () => {
  const client = new AWSAppSyncClient(
    {
      url: APPSYNC_URI,
      region: REGION,
      auth: {
        type: 'API_KEY',
        apiKey: APPSYNC_APIKEY
      }
    },
    {
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache'
        }
      }
    }
  )
}
