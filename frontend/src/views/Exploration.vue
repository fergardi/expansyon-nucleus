<template lang="pug">
  md-layout

    md-dialog(ref='form')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="attack()")
          md-card-header
            .md-title {{ selected.name }}
          md-card-content
            md-input-container
              md-icon send
              label Fighter
              md-input(type="number", v-model="fighter", min="0", required)
            md-input-container
              md-icon toys
              label Cruiser
              md-input(type="number", v-model="cruiser", min="0", required)
            md-input-container
              md-icon bubble_chart
              label Bomber
              md-input(type="number", v-model="bomber", min="0", required)
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
            md-button.md-dense.md-warn(v-on:click.native="clear()") Clear
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
          md-chip(v-if="planet.moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="planet.station") {{ 'resource.station' | i18n }}
        md-card-content
          span {{ planet.description }}

    md-layout(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title No planets to show.
</template>

<script>
  import api from '../services/api'
  import store from '../vuex/store'

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
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.exploration')
    },
    sockets: {
      exploration () {
        this.close()
        this.refresh()
      }
    },
    methods: {
      refresh () {
        api.getPlanets(store.state.account.id)
        .then((planets) => {
          this.planets = planets
        })
      },
      form () {
        this.$refs['form'].open()
      },
      close () {
        this.$refs['form'].close()
      },
      clear () {
        this.fighter = 0
        this.cruiser = 0
        this.bomber = 0
      },
      select (planet) {
        this.selected = planet
        this.form()
      },
      attack () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return store.state.search
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