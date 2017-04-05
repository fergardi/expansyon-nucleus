<template lang="pug">
  md-layout

    md-dialog(ref='form')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="attack()")
          md-card-header
            .md-title {{ selected.name | i18n }}
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

    md-layout(v-for="mission in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="mission.class", md-with-hover, v-on:click.native="select(mission)")
        md-card-header
          .md-title {{ mission.name | i18n }}
        md-card-media
          img(v-bind:src="mission.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="mission.attack")
          md-progress(v-bind:md-progress="mission.defense")
          md-progress(v-bind:md-progress="mission.speed")
        md-card-content.center
          span {{ mission.description | i18n }}

    md-layout.center(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-chip.red {{ 'filter.nothing' | i18n }}
</template>

<script>
  import api from '../services/api'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        missions: [],
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
      store.commit('title', 'title.cantina')
    },
    sockets: {
      cantina () {
        this.close()
        this.refresh()
      }
    },
    methods: {
      refresh () {
        api.getMissions()
        .then((missions) => {
          this.missions = missions
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
      select (mission) {
        this.selected = mission
        this.form()
      },
      attack () {
        // TODO
        this.close()
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
        return this.missions.filter((mission) => {
          return this.$t(mission.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
