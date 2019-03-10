<template>
    <v-container fluid>
        <h2>Vote</h2>
        <v-form
            ref="form"
            v-model="valid">
            <div class="form-group">
                <label for="exampleFormControlSelect1">
                    Favorite Service
                </label>
                <v-select
                    v-model="awsService"
                    :items="awsServices"
                    :rules="[v => !!v || 'Item is required']"
                    label="AWS Service"
                    required />
            </div>
            <v-btn
                color="info"
                class="btn btn-primary"
                @click="vote">
                Vote
            </v-btn>
        </v-form>
        <v-snackbar
            v-model="snackbar">
            {{ snackText }}
            <v-btn
                color="info"
                flat
                @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
import gql from 'graphql-tag'
export default {
    data: () => ({
        awsService: '',
        valid: true,
        snackbar: false,
        snackText: ''
    }),
    computed: {
        awsServices() {
            return this.$store.getters['vote/getServices']
        }
    },
    mounted() {
        this.$store.dispatch('vote/fetchServices')
    },
    methods: {
        vote() {
            this.$store.dispatch('vote/vote', this.awsService)
        }
    }
}
</script>
