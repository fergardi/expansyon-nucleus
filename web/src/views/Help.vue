<template lang="pug">
  p help
</template>

<script>
  import vuex from '../vuex/vuex.js'

  export default {
    mounted () {
      vuex.state.name = 'Help'
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
