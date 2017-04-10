<template lang="pug">
  md-layout

    md-dialog(ref='form')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="attack()")
          md-card-header
            .md-title
              span {{ selected.name }}
              md-chip {{ selected.total }}
          md-card-media.system
            .planet
              img(v-bind:src="selected.image")
            .orbit(v-if="selected.moon || selected.station")
              img(src="https://image.flaticon.com/icons/svg/361/361706.svg", v-show="selected.moon")
              img(src="https://image.flaticon.com/icons/svg/139/139726.svg", v-show="selected.station")
          md-card-content
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasFighter }")
              md-icon send
              label {{ 'ship.fighter.name' | i18n }} ({{ (player.fighter - fighter) | format }})
              md-input(type="number", v-model="fighter", min="0", v-bind:max="player.fighter", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasCruiser }")
              md-icon toys
              label {{ 'ship.cruiser.name' | i18n }} ({{ (player.cruiser - cruiser) | format }})
              md-input(type="number", v-model="cruiser", min="0", v-bind:max="player.cruiser", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
            md-input-container(v-bind:class="{ 'md-input-invalid': !hasBomber }")
              md-icon bubble_chart
              label {{ 'ship.bomber.name' | i18n }} ({{ (player.bomber - bomber) | format }})
              md-input(type="number", v-model="bomber", min="0", v-bind:max="player.bomber", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!can") {{ 'button.attack' | i18n }}

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
        md-card-content.no-padding.center
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
        fighter: 0,
        cruiser: 0,
        bomber: 0
      }
    },
    mounted () {
      store.commit('title', 'title.exploration')
    },
    methods: {
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
        var battle = {
          PlayerId: store.state.player.id,
          MissionId: null,
          PlanetId: this.selected.id,
          fighter: this.fighter,
          cruiser: this.cruiser,
          bomber: this.bomber
        }
        api.startBattle(battle)
        .then((battle) => {
          notification.success('notification.exploration.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.exploration.error')
        })
        .then(() => {
          this.clear()
          this.close()
        })
      }
    },
    computed: {
      player () {
        return store.state.player
      },
      hasFighter () {
        return this.fighter <= this.player.fighter
      },
      hasCruiser () {
        return this.cruiser <= this.player.cruiser
      },
      hasBomber () {
        return this.bomber <= this.player.bomber
      },
      can () {
        return this.hasFighter && this.hasCruiser && this.hasBomber && (this.fighter > 0 || this.cruiser > 0 || this.bomber > 0)
      },
      search () {
        return store.state.search
      },
      filtered () {
        return this.player.Exploration.filter((planet) => {
          return planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
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
