<template lang="pug">
  md-layout
    md-layout(v-for="planet in filtered", md-flex-xlarge="25", md-flex-large="25", md-flex-small="33", md-flex-xsmall="50")
      md-card.planet(v-bind:class="planet.class")
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