<template lang="pug">
  md-layout

    md-dialog(ref='sale')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="sell()")
          md-card-header
            .md-title
              span {{ selected.name }}
              md-chip {{ selected.total | format }}
          md-card-content
            md-input-container
              md-icon apps
              label {{ 'resource.metal' | i18n }}
              md-input(type="number", v-model.number="metal", min="0", required)
            md-input-container
              md-icon texture
              label {{ 'resource.crystal' | i18n }}
              md-input(type="number", v-model.number="crystal", min="0", required)
            md-input-container
              md-icon opacity
              label {{ 'resource.oil' | i18n }}
              md-input(type="number", v-model.number="oil", min="0", required)
            md-input-container
              md-icon whatshot
              label {{ 'resource.aether' | i18n }}
              md-input(type="number", v-model.number="aether", min="0", required)
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!has") {{ 'button.sell' | i18n }}

    md-dialog(ref='info')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title
            span {{ selected.name }}
            md-chip {{ selected.total | format }}
        md-card-media.system
          .planet
            img(v-bind:src="selected.image")
          .orbit(v-if="selected.moon || selected.station")
            img(src="https://image.flaticon.com/icons/svg/361/361706.svg", v-show="selected.moon")
            img(src="https://image.flaticon.com/icons/svg/139/139726.svg", v-show="selected.station")
        md-card-content
          span {{ selected.description | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.close' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="sale()") {{ 'button.sell' | i18n }}

    md-layout(v-for="planet in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
    
      md-card.md-primary.card(v-bind:class="planet.class", md-with-hover, v-on:click.native="select(planet)")
        md-card-header
          .md-title
            span {{ planet.name }}
            md-chip {{ planet.total | format }}
        md-card-media.system
          .planet
            img(v-bind:src="planet.image")
          .orbit(v-if="planet.moon || planet.station")
            img(src="https://image.flaticon.com/icons/svg/361/361706.svg", v-show="planet.moon")
            img(src="https://image.flaticon.com/icons/svg/139/139726.svg", v-show="planet.station")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="planet.metal")
          md-progress(v-bind:md-progress="planet.crystal")
          md-progress(v-bind:md-progress="planet.oil")
          md-progress(v-bind:md-progress="planet.size")
          md-progress(v-bind:md-progress="planet.energy")
          md-progress(v-bind:md-progress="planet.influence")
        md-card-content.center(v-if="planet.moon || planet.station")
          md-chip(v-if="planet.moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="planet.station") {{ 'resource.station' | i18n }}
        md-card-content.center
          span {{ planet.description | i18n }}

    md-layout.center(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-chip.red {{ 'filter.nothing' | i18n }}
</template>

<script>
  import api from '../services/api'
  import notification from '../services/notification'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        selected: {},
        metal: 0,
        crystal: 0,
        oil: 0,
        aether: 0
      }
    },
    mounted () {
      store.commit('title', 'title.planetarium')
    },
    methods: {
      info () {
        this.$refs['info'].open()
      },
      sale () {
        this.$refs['info'].close()
        this.$refs['sale'].open()
      },
      select (planet) {
        this.selected = planet
        this.info()
      },
      close () {
        this.$refs['info'].close()
        this.$refs['sale'].close()
      },
      clear () {
        this.metal = 0
        this.crystal = 0
        this.oil = 0
        this.aether = 0
      },
      sell () {
        var sale = {
          planetId: this.selected.id,
          quantity: 1,
          metal: this.metal,
          crystal: this.crystal,
          oil: this.oil,
          aether: this.aether
        }
        api.sellPlanet(store.state.player.id, sale)
        .then((result) => {
          notification.success('notification.planetarium.sale')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.planetarium.error')
        })
        .then(() => {
          this.clear()
          this.close()
        })
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
      has () {
        return this.metal > 0 || this.crystal > 0 || this.oil > 0 || this.aether > 0
      },
      planets () {
        return store.state.player.Planets
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .system
    display flex
    .planet
      flex 2
    .orbit
      flex 1
      display flex
      flex-direction column
      img
        height 70px !important
</style>
