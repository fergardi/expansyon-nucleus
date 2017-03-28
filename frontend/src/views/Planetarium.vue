<template lang="pug">
  md-layout

    md-dialog(ref='info')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }} {{ selected.total }}
        md-card-content
          span {{ selected.description }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.close' | i18n }}

    md-layout(v-for="planet in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
    
      md-card.md-primary.card(v-bind:class="planet.class", md-with-hover, v-on:click.native="info(planet)")
        md-card-header
          .md-title {{ planet.name }} {{ planet.total }}
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
          md-chip(v-if="planet.moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="planet.station") {{ 'resource.station' | i18n }}
        md-card-content.center
          span {{ planet.description }}

    md-layout.center(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-chip.red {{ 'filter.nothing' | i18n }}
</template>

<script>
  import store from '../vuex/store'

  export default {
    data () {
      return {
        selected: {}
      }
    },
    mounted () {
      store.commit('title', 'title.planetarium')
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
        return store.state.search
      },
      filtered () {
        return this.planets.filter((planet) => {
          return planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      planets () {
        return store.state.player.Planets
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>