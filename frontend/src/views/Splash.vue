<template lang="pug">
  md-layout.splash.padding

    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")

      md-card.card.flex
        md-card-content.flex.center
          span.title Expansyon
        md-card-content.center
          router-link(exact, to="/login")
            md-button.md-raised Play

    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")

      md-card.card.flex
        md-card-content.flex.center
          span.subtitle Explore
        md-card-media
          img(src="https://image.flaticon.com/icons/svg/124/124582.svg")
        md-card-content.flex.center.content
          p {{ '' | lorem }}

      md-card.card.flex
        md-card-content.flex.center
          span.subtitle Battle
        md-card-media
          img(src="https://image.flaticon.com/icons/svg/275/275056.svg")
        md-card-content.flex.center.content
          p {{ '' | lorem }}

      md-card.card.flex
        md-card-content.flex.center
          span.subtitle Win
        md-card-media
          img(src="https://image.flaticon.com/icons/svg/302/302284.svg")
        md-card-content.flex.center.content
          p {{ '' | lorem }}
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
  .subtitle
    color rgba(255,255,255,0.87)
    text-shadow 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1), 0px 18px 23px rgba(0, 0, 0, 0.1)
    font-weight 300
  .title
    font-size 3em
  .subtitle
    font-size 1.5em
  .card
    margin 8px
    opacity 1 !important
    box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.75);
    background url('img/splash.jpg') no-repeat center center fixed
    background-size cover
  .md-card-media
    background-color transparent !important
</style>
