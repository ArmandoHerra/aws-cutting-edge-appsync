<template>
    <v-container fluid>
        <h2>Results</h2>
        <v-list
            v-for="item in items"
            :key="item.type"
            subheader
            two-line>
            <v-subheader>
                {{ item.service }}
            </v-subheader>
            <v-list-tile>
                <v-list-tile-action>
                    <v-chip
                        color="blue"
                        text-color="white">
                        <v-avatar class="blue darken-4">
                            {{ item.upvotes }}
                        </v-avatar>
                        Votes
                    </v-chip>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </v-container>
</template>
<script>
import gql from 'graphql-tag'
export default {
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
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
                    console.log(
                        'GQL getVotingResults data: ',
                        JSON.stringify(result, null, 4)
                    )
                    result.data.getVotingResults.items.sort(
                        (a, b) => b.upvotes - a.upvotes
                    )
                    this.items = result.data.getVotingResults.items
                })
                .catch(err => {
                    console.log('GQL getVotingResults error: ', err)
                })
        },
        subscribe() {
            this.$client()
                .subscribe({
                    query: gql`
                        subscription {
                            voted
                        }
                    `
                })
                .subscribe(data => {
                    console.log(
                        'GQL subscribe data: ',
                        JSON.stringify(result, null, 4)
                    )
                    this.fetchData()
                })
        }
    }
}
</script>
