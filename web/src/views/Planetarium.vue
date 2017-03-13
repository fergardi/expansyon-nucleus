<template lang="pug">
  md-layout
    
    md-layout(v-for="planet in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="planet.class")
        md-card-header
          .md-title {{ planet.name }}
        md-card-media
          img(v-bind:src="planet.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="planet.size")
          md-progress(v-bind:md-progress="planet.metal")
          md-progress(v-bind:md-progress="planet.crystal")
          md-progress(v-bind:md-progress="planet.oil")
          md-progress(v-bind:md-progress="planet.energy")
          md-progress(v-bind:md-progress="planet.influence")
        md-card-content.center
          md-chip(v-if="planet.moon") Moon
          md-chip(v-if="planet.station") Station
        md-card-content.center
          span {{ planet.description | lorem }}
</template>

<script>
  import vuex from '../vuex/vuex'
  import factory from '../factories/planet'

  export default {
    data () {
      return {
        planets: []
      }
    },
    created () {
      for (var i = 0; i < 2; i++) {
        this.planets.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Planetarium'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.planets.filter((planet) => {
          return planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>