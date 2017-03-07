<template lang="pug">
  md-layout
    md-layout(v-for="mission in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="50")
      md-card.mission(v-bind:class="mission.class")
        md-card-header
          .md-title {{ mission.name }}
        md-card-media
          img(v-bind:src="mission.image")
        md-card-content.no-padding.center
          p Description
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/mission'

  export default {
    data () {
      return {
        missions: []
      }
    },
    created () {
      for (var i = 0; i < 3; i++) {
        this.missions.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Cantina'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.missions.filter((mission) => {
          return mission.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>