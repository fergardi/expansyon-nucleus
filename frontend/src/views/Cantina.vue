<template lang="pug">
  md-layout

    md-dialog(ref='form')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="attack()")
          md-card-header
            .md-title {{ selected.name | i18n }}
          md-card-content
            md-input-container
              md-icon send
              label {{ 'ship.fighter.name' | i18n }}
              md-input(type="number", v-model="fighter", min="0", required)
            md-input-container
              md-icon toys
              label {{ 'ship.cruiser.name' | i18n }}
              md-input(type="number", v-model="cruiser", min="0", required)
            md-input-container
              md-icon bubble_chart
              label {{ 'ship.bomber.name' | i18n }}
              md-input(type="number", v-model="bomber", min="0", required)
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
      search () {
        return store.state.search
      },
      filtered () {
        return this.missions.filter((mission) => {
          return this.$t(mission.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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