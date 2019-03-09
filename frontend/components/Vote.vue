<template>
    <div>
        <h2>Vote</h2>
        <form @submit.prevent="vote">
            <div class="form-group">
                <label for="exampleFormControlSelect1">Favorite Service</label>
                <select
                    v-model="service"
                    class="form-control">
                    <option
                        v-for="item in items"
                        :key="item.type">
                        {{ item.type }}
                    </option>
                </select>
            </div>
            <button
                type="submit"
                class="btn btn-primary">
                Submit
            </button>
        </form>
    </div>
</template>
<script>
import gql from 'graphql-tag'
export default {
    data() {
        return {
            items: null,
            service: null
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
                    // eslint-disable-next-line
                    console.log(result.data.getServices.items)
                    this.items = result.data.getServices.items.sort()
                    this.service = result.data.getServices.items[0]
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.log(err)
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
                    // eslint-disable-next-line
                    console.log(result)
                    // votingresults.fetchData();
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.log(err)
                })
        }
    }
}
</script>
