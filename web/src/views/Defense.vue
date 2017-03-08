<template lang="pug">
  md-layout
    md-layout(v-for="tower in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-small="50", md-flex-xsmall="50")
      md-card.md-primary.card(v-bind:class="tower.class")
        md-card-header
          .md-title {{ tower.name }}
        md-card-media
          img(v-bind:src="tower.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="tower.attack")
          md-progress(v-bind:md-progress="tower.defense")
          md-progress(v-bind:md-progress="tower.speed")
        md-card-content.no-padding.center
          p {{ tower.description }}
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/tower'

  export default {
    data () {
      return {
        towers: []
      }
    },
    created () {
      for (var i = 0; i < 3; i++) {
        this.towers.push(factory.build())
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
        return this.towers.filter((tower) => {
          return tower.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>