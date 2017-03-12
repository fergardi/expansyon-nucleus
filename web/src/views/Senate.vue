<template lang="pug">
  md-layout
    
    md-layout(v-for="referendum in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="referendum.class")
        md-card-header
          .md-title {{ referendum.name }}
        md-card-media.background
          img(v-bind:src="referendum.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="referendum.metal")
          md-progress(v-bind:md-progress="referendum.crystal")
          md-progress(v-bind:md-progress="referendum.oil")
          md-progress(v-bind:md-progress="referendum.attack")
          md-progress(v-bind:md-progress="referendum.defense")
          md-progress(v-bind:md-progress="referendum.speed")
        md-card-content.center
          span {{ referendum.description | lorem }}
        md-card-content.center
          md-button.md-raised.md-fab.md-mini.md-warn
            md-icon close
          md-button.md-raised.md-fab.md-mini.md-accent
            md-icon done
</template>

<script>
  import vuex from '../vuex/vuex'
  import factory from '../factories/referendum'

  export default {
    data () {
      return {
        referendums: []
      }
    },
    created () {
      for (var i = 0; i < 3; i++) {
        this.referendums.push(factory.build())
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
        return this.referendums.filter((referendum) => {
          return referendum.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>