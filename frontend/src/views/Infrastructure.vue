<template lang="pug">
  md-layout

    md-dialog(ref='build')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-content
          md-input-container
            md-icon add
            label Quantity
            md-input(type="number", v-model="quantity", required)
        md-card-content
          md-chip {{ (selected.metal * quantity) | format }} Metal
          md-chip {{ (selected.crystal * quantity) | format }} Crystal
          md-chip {{ (selected.oil * quantity) | format }} Oil
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
          md-button.md-dense.md-accent(v-on:click.native="build()", v-bind:disabled="!can") Build

    md-layout(v-for="building in filtered", md-flex-xlarge="25", md-flex-medium="50", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="building.class", md-with-hover, v-on:click.native="select(building)")
        md-card-header
          .md-title {{ building.name }}
        md-card-media
          img(v-bind:src="building.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="building.metal")
          md-progress(v-bind:md-progress="building.crystal")
          md-progress(v-bind:md-progress="building.oil")
        md-card-content
          span {{ building.description }}
        md-card-content
          md-chip {{ building.metal | format }} Metal
          md-chip {{ building.crystal | format }} Crystal
          md-chip {{ building.oil | format }} Oil
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        buildings: [],
        selected: {},
        metal: 0,
        crystal: 0,
        oil: 0
      }
    },
    created () {
      api.getBuildings()
      .then((buildings) => {
        this.buildings = buildings
      })
    },
    mounted () {
      vuex.commit('title', 'Infrastructure')
    },
    methods: {
      open () {
        this.$refs['build'].open()
      },
      close () {
        this.$refs['build'].close()
      },
      select (building) {
        this.selected = building
        this.open()
      },
      build () {
        // TODO
        this.close()
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
      can () {
        return true
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>