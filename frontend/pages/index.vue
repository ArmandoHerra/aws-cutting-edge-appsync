<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div class="container" style="margin-top: 10px;">
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
          <VoteResults />
        </div>

        <div class="col">
          <Vote />
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
