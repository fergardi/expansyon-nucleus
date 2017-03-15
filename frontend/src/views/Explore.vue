<template lang="pug">
  md-layout

    md-layout(md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-media
          img(v-bind:src="selected.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="selected.size", v-if="selected.size")
          md-progress(v-bind:md-progress="selected.metal", v-if="selected.metal")
          md-progress(v-bind:md-progress="selected.crystal", v-if="selected.crystal")
          md-progress(v-bind:md-progress="selected.oil", v-if="selected.oil")
          md-progress(v-bind:md-progress="selected.energy", v-if="selected.energy")
          md-progress(v-bind:md-progress="selected.influence", v-if="selected.influence")
        md-card-content.center
          md-chip(v-if="selected.moon") Moon
          md-chip(v-if="selected.station") Station
        md-card-content.center
          span {{ selected.description | lorem }}

    md-layout(md-flex-xlarge="75", md-flex-large="66", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Attack
        md-card-content
          form.center(novalidate, v-on:submit.stop.prevent="build()")
            md-input-container
              label Fighter
              md-input(type="number", v-model="fighter", required)
              md-icon send
            md-input-container
              label Cruiser
              md-input(type="number", v-model="cruiser", required)
              md-icon toys
            md-input-container
              label Bomber
              md-input(type="number", v-model="bomber", required)
              md-icon bubble_chart

            md-button.md-raised.md-fab.md-mini.md-warn(type="reset", v-bind:disabled="!valid")
              md-icon close
            md-button.md-raised.md-fab.md-mini.md-accent(type="submit", v-bind:disabled="!valid")
              md-icon done

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
        md-card-content.center
          md-chip(v-if="planet.moon") Moon
          md-chip(v-if="planet.station") Station
        md-card-content.center
          span {{ planet.description | lorem }}
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        planets: [],
        selected: {
          class: 'grey',
          name: 'SELECT PLANET',
          image: 'https://image.flaticon.com/icons/svg/202/202483.svg',
          description: 'Choose a planet to attack'
        },
        fighter: 0,
        cruiser: 0,
        bomber: 0
      }
    },
    created () {
      api.getPlanets()
      .then((planets) => {
        this.planets = planets
      })
    },
    mounted () {
      vuex.state.title = 'Explore'
    },
    methods: {
      select (item) {
        this.selected = item
        if (document.getElementById('scroll')) document.getElementById('scroll').scrollIntoView(true)
      },
      build () {
        console.log('Selling ' + this.selected)
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
      valid () {
        return true
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>