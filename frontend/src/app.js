import { AWSAppSyncClient } from 'aws-appsync'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import Vue from 'vue'

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

client
  .subscribe({
    query: gql`
      subscription {
        voted
      }
    `
  })
  .subscribe(data => {
    votingresults.fetchData()
  })

var votingresults = new Vue({
  el: '#votingresults',
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      client
        .query({
          query: gql`
            {
              getVotingResults(nextToken: null) {
                items {
                  service
                  upvotes
                }
                nextToken
              }
            }
          `
        })
        .then(result => {
          console.log(result)
          result.data.getVotingResults.items.sort(
            (a, b) => b.upvotes - a.upvotes
          )
          this.items = result.data.getVotingResults.items
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

const vote = new Vue({
  el: '#vote',
  data() {
    return {
      items: null,
      service: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    vote() {
      client
        .mutate({
          mutation: gql`
            mutation {
              vote(service: ${this.service})
            }
          `
        })
        .then(result => {
          console.log(result)
          // votingresults.fetchData();
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchData() {
      console.log('fetchData()')
      client
        .query({
          query: gql`
            {
              getServices(nextToken: null) {
                items {
                  type
                }
                nextToken
              }
            }
          `
        })
        .then(result => {
          console.log(result.data.getServices.items)
          this.items = result.data.getServices.items.sort()
          this.service = result.data.getServices.items[0]
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
