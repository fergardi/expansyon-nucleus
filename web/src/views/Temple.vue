<template lang="pug">
  md-layout
    md-layout(v-for="faction in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="50")
      md-card.md-primary.card(v-bind:class="faction.class")
        md-card-header
          .md-title {{ faction.name }}
        md-card-media
          img(v-bind:src="faction.image")
        md-card-content.no-padding.center
          p {{ faction.description }}
        md-card-content.no-padding.center
          md-button.md-raised.md-accent
            md-icon done
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/faction'

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