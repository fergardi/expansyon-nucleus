<template lang="pug">
  p reputation
</template>

<script>
  import vuex from '../vuex/vuex.js'

  export default {
    mounted () {
      vuex.state.name = 'Reputation'
    },
    computed: {
      search () {
        return vuex.state.search
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
