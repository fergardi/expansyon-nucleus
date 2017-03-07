<template lang="pug">
  md-layout
    md-layout(v-for="building in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="50")
      md-card.building(v-bind:class="building.class")
        md-card-header
          .md-title {{ building.name }}
        md-card-media
          img(v-bind:src="building.image")
        md-card-content.no-padding.center
          p Description
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/building'

  export default {
    data () {
      return {
        buildings: []
      }
    },
    created () {
      for (var i = 0; i < 6; i++) {
        this.buildings.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Infrastructure'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.buildings.filter((building) => {
          return building.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>