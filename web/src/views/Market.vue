<template lang="pug">
  md-layout
    md-layout(v-for="sale in filtered", md-flex-xlarge="25", md-flex-large="25", md-flex-small="33", md-flex-xsmall="50")
      md-card.sale(v-bind:class="sale.class")
        md-card-header
          .md-title {{ sale.name }}
        md-card-media
          img(v-bind:src="sale.image")
        md-card-content.no-padding.center
          p Descripcion
</template>

<script>
  import vuex from '../vuex/vuex'
  import factory from '../factories/sale'

  export default {
    data () {
      return {
        sales: []
      }
    },
    created () {
      for (var i = 0; i < 2; i++) {
        this.sales.push(factory.build())
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