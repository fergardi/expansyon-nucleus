<template lang="pug">
  md-layout
    
    md-layout(md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-media
          img(v-bind:src="selected.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="selected.metal")
          md-progress(v-bind:md-progress="selected.crystal")
          md-progress(v-bind:md-progress="selected.oil")
        md-card-content.center
          span {{ selected.description | lorem }}

    md-layout(md-flex-xlarge="75", md-flex-large="66", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title Build
        md-card-content
          form.center(novalidate, v-on:submit.stop.prevent="build()")
            md-input-container
              label Quantity
              md-input(type="number", v-model="quantity", required)
              md-icon equalizer
            md-input-container
              label Metal
              md-input(type="number", v-model="metal", readonly, disabled)
              md-icon apps
            md-input-container
              label Crystal
              md-input(type="number", v-model="crystal", readonly, disabled)
              md-icon texture
            md-input-container
              label Oil
              md-input(type="number", v-model="oil", readonly, disabled)
              md-icon opacity
              
            md-button.md-raised.md-fab.md-mini.md-warn(type="reset", v-bind:disabled="!valid")
              md-icon close
            md-button.md-raised.md-fab.md-mini.md-accent(type="submit", v-bind:disabled="!valid")
              md-icon done

    md-layout(v-for="building in filtered", md-flex-xlarge="25", md-flex-medium="50", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="building.class", md-with-hover, v-on:click.native="select(building)")
        md-card-header
          .md-title {{ building.name }}
        md-card-media
          img(v-bind:src="building.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="building.metal")
          md-progress(v-bind:md-progress="building.crystal")
          md-progress(v-bind:md-progress="building.oil")
        md-card-content.center
          span {{ building.description | lorem }}
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        buildings: [],
        selected: {
          class: 'grey',
          name: 'SELECT BUILDING',
          image: 'https://image.flaticon.com/icons/svg/202/202483.svg',
          description: 'Choose an item to build'
        },
        metal: 0,
        crystal: 0,
        oil: 0
      }
    },
    created () {
      api.getBuildings()
      .then((data) => {
        this.buildings = data
      })
    },
    mounted () {
      vuex.state.title = 'Infrastructure'
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
        return this.buildings.filter((building) => {
          return building.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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