<template lang="pug">
  md-layout.splash

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card(md-with-hover)
        md-card-header
          .md-title Empire Development
        md-card-media
          md-image.pulse(md-src="https://image.flaticon.com/icons/svg/224/224474.svg")
        md-card-content.center
          p {{ '' | lorem }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card(md-with-hover)
        md-card-header
          .md-title Space Exploration
        md-card-media
          md-image.tossing(md-src="https://image.flaticon.com/icons/svg/124/124558.svg")
        md-card-content.center
          p {{ '' | lorem }}

    md-layout(md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card(md-with-hover)
        md-card-header
          .md-title Ship Battles
        md-card-media
          md-image.floating(md-src="https://image.flaticon.com/icons/svg/124/124571.svg")
        md-card-content.center
          p {{ '' | lorem }}
</template>

<script>
  import store from '../vuex/store'

  export default {
    mounted () {
      store.commit('title', 'Splash')
      store.commit('enablefullscreen')
    },
    destroyed () {
      store.commit('disablefullscreen')
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
