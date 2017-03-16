<template lang="pug">
  md-layout

    md-dialog(ref='attack')
      md-dialog-title {{ selected.name }}
      md-dialog-content
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
      md-dialog-actions
        md-button.md-icon-button.md-accent(v-on:click.native="attack()", v-bind:disabled="!can")
          md-icon done

    md-layout(v-for="mission in filtered", md-flex-xlarge="25", md-flex-medium="50", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="mission.class", md-with-hover, v-on:click.native="select(mission)")
        md-card-header
          .md-title {{ mission.name }}
        md-card-media
          img(v-bind:src="mission.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="mission.attack")
          md-progress(v-bind:md-progress="mission.defense")
          md-progress(v-bind:md-progress="mission.speed")
        md-card-content.center
          span {{ mission.description | lorem }}
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

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
      api.getMissions()
      .then((missions) => {
        this.missions = missions
      })
    },
    mounted () {
      vuex.state.title = 'Cantina'
    },
    methods: {
      open () {
        this.$refs['attack'].open()
      },
      close () {
        this.$refs['attack'].close()
      },
      select (mission) {
        this.selected = mission
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
        return this.missions.filter((mission) => {
          return mission.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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