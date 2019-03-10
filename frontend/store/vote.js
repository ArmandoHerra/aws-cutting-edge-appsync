import gql from 'graphql-tag'

export const state = () => ({
    services: [],
    service: null,
    votingResults: []
})
export const getters = {
    getServices: state => state.services,
    getService: state => state.service,
    getResults: state => state.votingResults
}
export const mutations = {
    setServices: (state, services) => (state.services = services),
    setService: (state, service) => (state.service = service),
    setVotingResults: (state, results) => (state.votingResults = results)
}
export const actions = {
    fetchServices(vuexContext, payload) {
        this.$client()
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
                const items = []
                result.data.getServices.items.sort().map(item => {
                    items.push(item.type)
                })
                vuexContext.commit('setServices', items)
                vuexContext.commit('setService', items[0])
            })
            .catch(err => {
                console.log('GQL getServices error: ', err)
            })
    },
    fetchVotingResults(vuexContext, payload) {
        this.$client()
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
                let items = []
                result.data.getVotingResults.items
                    .sort((a, b) => b.upvotes - a.upvotes)
                    .map(i => items.push(i))
                vuexContext.commit('setVotingResults', items)
            })
            .catch(err => {
                console.log('GQL getVotingResults error: ', err)
            })
    },
    vote(vuexContext, payload) {
        this.$client()
            .mutate({
                mutation: gql`
                    mutation {
                        vote(service: ${payload})
                    }
                `
            })
            .catch(err => {
                console.log('GQL vote error: ', err)
            })
    }
}
