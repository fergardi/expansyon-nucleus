<template lang="pug">
  md-layout
    md-layout(v-for="law in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="50")
      md-card.md-primary.card(v-bind:class="law.class")
        md-card-header
          .md-title {{ law.name }}
        md-card-media
          img(v-bind:src="law.image")
        md-card-content.no-padding.center
          p {{ law.description }}
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