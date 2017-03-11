<template lang="pug">
  md-layout
    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card
        md-card-header
          .md-title Title
        md-card-content
          p content
</template>

<script>
  import vuex from '../vuex/vuex.js'

  export default {
    mounted () {
      vuex.state.name = 'Profile'
    },
    computed: {
      search () {
        return vuex.state.search
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .md-card
    .md-card-header
      .md-title
        text-align left
</style>
