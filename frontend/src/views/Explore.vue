<template lang="pug">
  md-layout

    md-dialog(ref='attack')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="attack")
          md-card-header
            .md-title {{ selected.name }}
          md-card-content
            md-input-container
              md-icon send
              label Fighter
              md-input(type="number", v-model="fighter", required)
            md-input-container
              md-icon toys
              label Cruiser
              md-input(type="number", v-model="cruiser", required)
            md-input-container
              md-icon bubble_chart
              label Bomber
              md-input(type="number", v-model="bomber", required)
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
            md-button.md-dense.md-warn(type="reset") Clear
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!can") Attack

    md-layout(v-for="planet in filtered", md-flex-xlarge="25", md-flex-medium="50", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="planet.class", md-with-hover, v-on:click.native="select(planet)")
        md-card-header
          .md-title {{ planet.name }}
        md-card-media
          img(v-bind:src="planet.image")
        md-card-content.no-padding.center
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
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        planets: [],
        selected: {},
        fighter: 0,
        cruiser: 0,
        bomber: 0
      }
    },
    created () {
      api.getPlanets(vuex.state.player.id)
      .then((planets) => {
        this.planets = planets
      })
    },
    mounted () {
      vuex.commit('title', 'Explore')
    },
    methods: {
      open () {
        this.$refs['attack'].open()
      },
      close () {
        this.$refs['attack'].close()
      },
      select (planet) {
        this.selected = planet
        this.open()
      },
      attack () {
        // TODO
        this.close()
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
      },
      can () {
        return true
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>