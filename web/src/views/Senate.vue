<template lang="pug">
  md-layout
    
    md-layout(v-for="law in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="law.class")
        md-card-header
          .md-title {{ law.name }}
        md-card-media.background
          img(v-bind:src="law.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="law.metal")
          md-progress(v-bind:md-progress="law.crystal")
          md-progress(v-bind:md-progress="law.oil")
          md-progress(v-bind:md-progress="law.attack")
          md-progress(v-bind:md-progress="law.defense")
          md-progress(v-bind:md-progress="law.speed")
        md-card-content.center
          span {{ law.description | lorem }}
        md-card-content.center
          md-button.md-raised.md-warn
            md-icon close
          md-button.md-raised.md-accent
            md-icon done
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/law'

  export default {
    data () {
      return {
        laws: []
      }
    },
    created () {
      for (var i = 0; i < 3; i++) {
        this.laws.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Senate'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.laws.filter((law) => {
          return law.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>