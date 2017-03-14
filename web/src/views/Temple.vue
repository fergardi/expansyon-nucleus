<template lang="pug">
  md-layout
    
    md-layout(v-for="faction in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="faction.class")
        md-card-header
          .md-title {{ faction.name }}
        md-card-media
          img(v-bind:src="faction.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="faction.metal")
          md-progress(v-bind:md-progress="faction.crystal")
          md-progress(v-bind:md-progress="faction.oil")
          md-progress(v-bind:md-progress="faction.size")
          md-progress(v-bind:md-progress="faction.energy")
          md-progress(v-bind:md-progress="faction.influence")
          md-progress(v-bind:md-progress="faction.attack")
          md-progress(v-bind:md-progress="faction.defense")
          md-progress(v-bind:md-progress="faction.speed")
        md-card-content.center
          span {{ faction.description | lorem }}
        md-card-content.center
          md-button.md-raised.md-fab.md-mini.md-accent
            md-icon done
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        factions: []
      }
    },
    created () {
      api.getFactions()
      .then((response) => {
        this.factions = response
      })
    },
    mounted () {
      vuex.state.name = 'Guild'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.factions.filter((faction) => {
          return faction.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>