<template lang="pug">
  md-layout
    md-layout(v-for="ship in filtered", md-flex-xlarge="25", md-flex-large="25", md-flex-small="33", md-flex-xsmall="50")
      md-card.ship(v-bind:class="ship.class")
        md-card-header
          .md-title {{ ship.name }}
        md-card-media
          img(v-bind:src="ship.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="ship.attack")
          md-progress(v-bind:md-progress="ship.defense")
          md-progress(v-bind:md-progress="ship.speed")
          p Description
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/ship'

  export default {
    data () {
      return {
        ships: []
      }
    },
    created () {
      for (var i = 0; i < 6; i++) {
        this.ships.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Hangar'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.ships.filter((ship) => {
          return ship.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>