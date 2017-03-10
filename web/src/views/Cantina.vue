<template lang="pug">
  md-layout
    
    md-layout(v-for="mission in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="mission.class")
        md-card-header
          .md-title {{ mission.name }}
        md-card-media.background
          img(v-bind:src="mission.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="mission.attack")
          md-progress(v-bind:md-progress="mission.defense")
          md-progress(v-bind:md-progress="mission.speed")
        md-card-content.center
          span {{ mission.description | lorem }}
        md-card-content.center
          md-button.md-raised.md-accent
            md-icon done
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