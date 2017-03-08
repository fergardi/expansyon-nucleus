<template lang="pug">
  md-layout
    md-layout(v-for="sale in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-small="33", md-flex-xsmall="50")
      md-card.md-primary.card(v-bind:class="sale.class")
        md-card-header
          .md-title {{ sale.name }}
        md-card-media
          img(v-bind:src="sale.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="sale.size", v-if="sale.size")
          md-progress(v-bind:md-progress="sale.metal", v-if="sale.metal")
          md-progress(v-bind:md-progress="sale.crystal", v-if="sale.crystal")
          md-progress(v-bind:md-progress="sale.oil", v-if="sale.oil")
          md-progress(v-bind:md-progress="sale.energy", v-if="sale.energy")
          md-progress(v-bind:md-progress="sale.influence", v-if="sale.influence")
        md-card-content.no-padding.center
          p(v-if="sale.description") {{ sale.description }}
        md-card-content.no-padding.center
          md-chip 333
</template>

<script>
  import vuex from '../vuex/vuex'
  import artifactFactory from '../factories/artifact'
  import planetFactory from '../factories/planet'
  import shipFactory from '../factories/ship'

  export default {
    data () {
      return {
        sales: []
      }
    },
    created () {
      for (let i = 0; i < 3; i++) {
        this.sales.push(artifactFactory.build())
        this.sales.push(planetFactory.build())
        this.sales.push(shipFactory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Market'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.sales.filter((sale) => {
          return sale.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>