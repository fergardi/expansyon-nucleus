<template lang="pug">
  md-layout

    md-layout(md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-media
          img(v-bind:src="selected.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="selected.attack")
          md-progress(v-bind:md-progress="selected.defense")
          md-progress(v-bind:md-progress="selected.speed")
        md-card-content.center
          span {{ selected.description | lorem }}

    md-layout(md-flex-xlarge="75", md-flex-large="66", md-flex-small="50", md-flex-xsmall="100")
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

    md-layout(v-for="mission in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
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
        selected: {
          class: 'grey',
          name: 'SELECT MISSION',
          image: 'https://image.flaticon.com/icons/svg/202/202483.svg',
          description: 'Choose a mission'
        },
        fighter: 0,
        cruiser: 0,
        bomber: 0
      }
    },
    created () {
      api.getMissions()
      .then((data) => {
        this.missions = data
      })
    },
    mounted () {
      vuex.state.title = 'Cantina'
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
        return this.missions.filter((mission) => {
          return mission.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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