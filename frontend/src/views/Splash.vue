<template lang="pug">
  md-layout.splash.padding

    md-layout(md-flex-xlarge="33", md-flex-large="50", md-flex-medium="66", md-flex-small="100", md-flex-xsmall="100")

      h2.flex.center.title EXPANSYON
</template>

<script>
  import store from '../vuex/store'

  export default {
    mounted () {
      store.commit('title', 'title.splash')
      store.commit('enablefullscreen')
    },
    destroyed () {
      store.commit('disablefullscreen')
    }
  }
</script>

<style lang="stylus" scoped>
  .title
    margin-bottom 50px
    font-size 3em
    color black
    text-shadow 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1), 0px 18px 23px rgba(0, 0, 0, 0.1)
</style>
