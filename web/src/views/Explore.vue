<template lang="pug">
  div
    md-layout
      md-layout(v-for="planet in planets", md-flex-xlarge="25", md-flex-large="25", md-flex-small="33", md-flex-xsmall="50")
        md-card(v-bind:class="color(planet)")
          md-card-header
            .md-title {{ planet.title }}
          md-card-media
            img(v-bind:src="planet.image")
          md-card-content.no-padding
            md-progress.size(v-bind:md-progress="planet.size")
            md-progress.metal(v-bind:md-progress="planet.metal")
            md-progress.crystal(v-bind:md-progress="planet.crystal")
            md-progress.oil(v-bind:md-progress="planet.oil")
            md-progress.energy(v-bind:md-progress="planet.energy")
            md-progress.influence(v-bind:md-progress="planet.influence")
</template>

<script>
  import vuex from '../vuex/vuex.js'
  export default {
    data () {
      return {
        planets: []
      }
    },
    created () {
      var images = [
        'https://image.flaticon.com/icons/svg/124/124558.svg',
        'https://image.flaticon.com/icons/svg/124/124582.svg',
        'https://image.flaticon.com/icons/svg/139/139706.svg',
        'https://image.flaticon.com/icons/svg/139/139706.svg',
        'https://image.flaticon.com/icons/svg/124/124581.svg',
        'https://image.flaticon.com/icons/svg/139/139727.svg',
        'https://image.flaticon.com/icons/svg/207/207532.svg',
        'https://image.flaticon.com/icons/svg/308/308748.svg',
        'https://image.flaticon.com/icons/svg/124/124555.svg',
        'https://image.flaticon.com/icons/svg/139/139682.svg',
        'https://image.flaticon.com/icons/svg/139/139725.svg',
        'https://image.flaticon.com/icons/svg/139/139730.svg',
        'https://image.flaticon.com/icons/svg/139/139728.svg',
        'https://image.flaticon.com/icons/svg/231/231105.svg',
        'https://image.flaticon.com/icons/svg/327/327483.svg',
        'https://image.flaticon.com/icons/svg/305/305895.svg',
        'https://image.flaticon.com/icons/svg/310/310121.svg',
        'https://image.flaticon.com/icons/svg/170/170816.svg',
        'https://image.flaticon.com/icons/svg/290/290846.svg',
        'https://image.flaticon.com/icons/svg/290/290904.svg',
        'https://image.flaticon.com/icons/svg/234/234298.svg',
        'https://image.flaticon.com/icons/svg/290/290867.svg'
      ]
      for (var i = 0; i < 8; i++) {
        var planet = {
          image: images[Math.floor(Math.random() * images.length)],
          title: 'ABC-123',
          size: Math.floor(Math.random() * 80),
          metal: Math.floor(Math.random() * 80),
          crystal: Math.floor(Math.random() * 80),
          oil: Math.floor(Math.random() * 80),
          energy: Math.floor(Math.random() * 80),
          influence: Math.floor(Math.random() * 80)
        }
        this.planets.push(planet)
      }
    },
    mounted () {
      vuex.state.name = 'Explore'
    },
    methods: {
      color (planet) {
        if ((planet.size + planet.metal + planet.crystal + planet.oil + planet.energy + planet.influence) / 6 > 50) {
          return 'all'
        } else if (planet.metal > 50) {
          return 'metal'
        } else if (planet.crystal > 50) {
          return 'crystal'
        } else if (planet.oil > 50) {
          return 'oil'
        } else if (planet.energy > 50) {
          return 'energy'
        } else if (planet.influence > 50) {
          return 'influence'
        } else {
          return 'size'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .md-card
    margin 4px
    .md-card-header
      .md-title
        text-align center
    .md-card-content
      .md-progress
        height 10px
        margin 5px 0
    .md-card-media
      background-color black
      img
        height 140px
        padding 10px
    &.size
      .md-card-header
      .md-progress
        background-color #4CAF50
    &.metal
      .md-card-header
      .md-progress
        background-color #673AB7
    &.crystal
      .md-card-header
      .md-progress
        background-color #E91E63
    &.oil
      .md-card-header
      .md-progress
        background-color #9E9E9E
    &.energy
      .md-card-header
      .md-progress
        background-color #3F51B5
    &.influence
      .md-card-header
      .md-progress
        background-color #F44336
    &.all
      .md-card-header
      .md-progress
        background-color #FF9800
</style>