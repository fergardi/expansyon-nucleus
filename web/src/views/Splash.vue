<template lang="pug">
  md-layout.splash

    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Planet Exploration
        md-card-media
          md-image.image(md-src="img/blue.gif")
        md-card-header
          .md-title Space Battles
        md-card-media
          md-image.image(md-src="img/red.gif")
</template>

<script>
  import vuex from '../vuex/vuex'

  export default {
    mounted () {
      vuex.state.name = 'Splash'
      vuex.state.fullscreen = true
    },
    destroyed () {
      vuex.state.fullscreen = false
    }
  }
</script>

<style lang="stylus" scoped>
  .splash
    display flex
    align-items center
    justify-content center
  .image
    width 100%
    height auto
</style>
