<template>
    <v-layout
        column
        justify-center
        align-center>
        <v-container fluid>
            <v-flex
                xs12
                sm6
                offset-sm3>
                <v-card>
                    <v-img
                        src="https://cdn-images-1.medium.com/max/1200/1*tFl-8wQUENETYLjX5mYWuA.png"
                        aspect-ratio="2.75" />
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">
                                Favorite AWS Service
                            </h3>
                            <div>
                                Vote for your favorite AWS Service.
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex
                xs12
                sm6
                offset-sm3>
                <vote />
                <vote-results />
            </v-flex>
        </v-container>
    </v-layout>
</template>

<script>
import Vote from '~/components/Vote'
import VoteResults from '~/components/VoteResults'
export default {
    components: {
        Vote,
        VoteResults
    }
}
</script>
