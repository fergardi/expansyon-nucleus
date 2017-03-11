<template lang="pug">
  md-layout
    
    md-layout(v-for="faction in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="faction.class")
        md-card-header
          .md-title {{ faction.name }}
        md-card-media.background
          img(v-bind:src="faction.image")
        md-card-content.center
          span {{ faction.description | lorem }}
        md-card-content.center
          md-button.md-raised.md-accent
            md-icon done
</template>

<script>
  import factory from '../factories/faction'
  import vuex from '../vuex/vuex.js'

  export default {
    data () {
      return {
        factions: []
      }
    },
    created () {
      for (var i = 0; i < 6; i++) {
        this.factions.push(factory.build())
      }
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