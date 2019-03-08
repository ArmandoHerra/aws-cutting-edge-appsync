<template>
    <div id="votingresults">
        <h2>Results</h2>
        <ul class="list-group">
            <li
                v-for="item in items"
                :key="item"
                class="list-group-item d-flex justify-content-between align-items-center">
                {{ item.service }}
                <span class="badge badge-dark badge-pill">{{ item.upvotes }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
    data() {
        return {
            items: []
        }
    },
    created() {
        // this.fetchData()
    },
    methods: {
        fetchData() {
            this.client
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
                    // eslint-disable-next-line
                    console.log(result)
                    result.data.getVotingResults.items.sort(
                        (a, b) => b.upvotes - a.upvotes
                    )
                    this.items = result.data.getVotingResults.items
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.log(err)
                })
        }
    },
    subscribe: function() {
        this.client
            .subscribe({
                query: gql`
                    subscription {
                        voted
                    }
                `
            })
            .subscribe(data => {
                this.fetchData()
            })
    }
}
</script>
<style scoped>
</style>
