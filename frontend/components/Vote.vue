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
                    v-model="service"
                    :items="items"
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
        items: null,
        service: null, // Here
        valid: true,
        select: null,
        snackbar: false,
        snackText: ''
    }),
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.$refs.form.reset()
            this.validate()
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
                    console.log(
                        'GQL getServices data: ',
                        JSON.stringify(result, null, 4)
                    )
                    this.items = []
                    result.data.getServices.items.sort().map(item => {
                        this.items.push(item.type)
                    })
                    this.service = this.items[0]
                })
                .catch(err => {
                    console.log('GQL getServices error: ', err)
                })
        },
        vote() {
            this.$client()
                .mutate({
                    mutation: gql`
                        mutation {
                            vote(service: ${this.service})
                        }
                    `
                })
                .then(result => {
                    console.log(
                        'GQL vote data: ',
                        JSON.stringify(result, null, 4)
                    )
                    this.snackText = 'Vote Successfull'
                    this.snackbar = true
                    this.fetchData()
                })
                .catch(err => {
                    console.log('GQL vote error: ', err)
                    this.snackText = 'Error Voting'
                    this.snackbar = true
                })
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        }
    }
}
</script>
