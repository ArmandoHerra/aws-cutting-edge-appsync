import { AWSAppSyncClient } from 'aws-appsync'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import Vue from 'vue'

const REGION = 'eu-west-1'
const APPSYNC_URI =
    'https://v233izxeofbg7mpx6pslew2wwm.appsync-api.eu-west-1.amazonaws.com/graphql'
const APPSYNC_APIKEY = 'da2-7scjjscmlzcqtgkjm4kfv5czaa'

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

// export default ({ app }, inject) => {
//     app.myInjectedFunction = string =>
//         console.log('Okay, another function', string)
//     app.client = new AWSAppSyncClient(
//         {
//             url: APPSYNC_URI,
//             region: REGION,
//             auth: {
//                 type: 'API_KEY',
//                 apiKey: APPSYNC_APIKEY
//             }
//         },
//         {
//             defaultOptions: {
//                 query: {
//                     fetchPolicy: 'no-cache'
//                 }
//             }
//         }
//     )
// }

Vue.prototype.$myInjectedFunction = string =>
    console.log('This is an example', string)
