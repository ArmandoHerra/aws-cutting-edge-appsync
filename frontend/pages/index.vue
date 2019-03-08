Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 @ArmandoHerra Sign out
1
0 1 ArmandoHerra/aws-cutting-edge-appsync
forked from widdix/aws-cutting-edge-appsync
 Code  Pull requests 0  Projects 0  Wiki  Insights  Settings
aws-cutting-edge-appsync/frontend/pages/index.vue
 Juan Pablo Ramírez Guerra Switched to Nuxt project
ecb9310  4 hours ago
39 lines (36 sloc)  712 Bytes
    
<template>
    <v-layout
        column
        justify-center
        align-center>
        <div
            class="container"
            style="margin-top: 10px;">
            <div class="jumbotron">
                <h1 class="display-4">
                    Favorite AWS Architecture
                </h1>
                <p class="lead">
                    Vote for your favorite architecture.
                </p>
            </div>
            <div class="row">
                <div class="col">
                    <vote-results />
                </div>
                <div class="col">
                    <vote />
                </div>
            </div>
        </div>
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
