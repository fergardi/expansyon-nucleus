<template lang="pug">
  md-layout

    md-dialog(ref='info')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-content
          span {{ selected.description }}
        md-card-actions
          md-button.md-icon-button.md-accent(v-on:click.native="close()")
            md-icon done

    md-layout(v-for="planet in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
    
      md-card.md-primary.card(v-bind:class="planet.class", md-with-hover, v-on:click.native="info(planet)")
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
        md-card-content.center(v-if="planet.moon || planet.station")
          md-chip(v-if="planet.moon") Moon
          md-chip(v-if="planet.station") Station
        md-card-content.center
          span {{ planet.description }}

    md-layout(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title You have no planets.
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        planets: [],
        selected: {}
      }
    },
    created () {
      api.getPlayer(vuex.state.player.id)
      .then((player) => {
        this.planets = player.Planets
      })
    },
    mounted () {
      vuex.commit('title', 'Planetarium')
    },
    methods: {
      info (planet) {
        this.selected = planet
        this.$refs['info'].open()
      },
      close () {
        this.$refs['info'].close()
      }
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