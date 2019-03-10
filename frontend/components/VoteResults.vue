<template>
    <v-container fluid>
        <h2>Results</h2>
        <v-list
            v-for="vote in votes"
            :key="vote.type"
            subheader
            two-line>
            <v-subheader>
                {{ vote.service }}
            </v-subheader>
            <v-list-tile>
                <v-list-tile-action>
                    <v-chip
                        color="blue"
                        text-color="white">
                        <v-avatar class="blue darken-4">
                            {{ vote.upvotes }}
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
    data: () => ({}),
    computed: {
        votes() {
            return this.$store.getters['vote/getResults']
        }
    },
    mounted() {
        this.$store.dispatch('vote/fetchVotingResults')
    }
}
</script>
