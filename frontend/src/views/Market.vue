<template lang="pug">
  md-layout
  
    md-dialog(ref='info')
      md-card.md-primary(v-bind:class="item(selected).class")
        md-card-header
          .md-title
            span {{ item(selected).name }}
            span(v-if="selected.quantity > 0")  ({{ selected.quantity | format }})
        md-card-content
          span {{ item(selected).description }}
        md-card-content.center
          md-chip(v-if="selected.metal > 0") {{ selected.metal | format }} Metal
          md-chip(v-if="selected.crystal > 0") {{ selected.crystal | format }} Crystal
          md-chip(v-if="selected.oil > 0") {{ selected.oil | format }} Oil
          md-chip.pink(v-if="selected.aether > 0") {{ selected.aether | format }} Aether
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
          md-button.md-dense.md-accent(v-on:click.native="buy()") Buy

    md-layout(v-for="sale in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")

      md-card.md-primary.card(v-bind:class="item(sale).class", md-with-hover, v-on:click.native="select(sale)")
        md-card-header
          .md-title
            span {{ item(sale).name }}
            span(v-if="sale.quantity > 0")  ({{ sale.quantity | format }})
        md-card-media
          img(v-bind:src="item(sale).image")
        md-card-content.no-padding(v-if="sale.Planet")
          md-progress(v-bind:md-progress="item(sale).metal", v-if="item(sale).metal")
          md-progress(v-bind:md-progress="item(sale).crystal", v-if="item(sale).crystal")
          md-progress(v-bind:md-progress="item(sale).oil", v-if="item(sale).oil")
          md-progress(v-bind:md-progress="item(sale).size", v-if="item(sale).size")
          md-progress(v-bind:md-progress="item(sale).energy", v-if="item(sale).energy")
          md-progress(v-bind:md-progress="item(sale).influence", v-if="item(sale).influence")
        md-card-content.no-padding.center(v-if="sale.Relic")
          // TODO
        md-card-content.no-padding(v-if="sale.Ship")
          md-progress(v-bind:md-progress="item(sale).attack", v-if="item(sale).attack")
          md-progress(v-bind:md-progress="item(sale).defense", v-if="item(sale).defense")
          md-progress(v-bind:md-progress="item(sale).speed", v-if="item(sale).speed")
        md-card-content.center(v-if="item(sale).moon || item(sale).station")
          md-chip(v-if="item(sale).moon") Moon
          md-chip(v-if="item(sale).station") Station
        md-card-content(v-if="item(sale).description")
          span {{ item(sale).description }}
        md-card-content.center
          md-chip(v-if="sale.metal > 0") {{ sale.metal | format }} Metal
          md-chip(v-if="sale.crystal > 0") {{ sale.crystal | format }} Crystal
          md-chip(v-if="sale.oil > 0") {{ sale.oil | format }} Oil
          md-chip.pink(v-if="sale.aether > 0") {{ sale.aether | format }} Aether

    md-layout(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title No items to buy.
</template>

<script>
  import store from '../vuex/store'
  import api from '../services/api'

  export default {
    data () {
      return {
        sales: [],
        selected: {}
      }
    },
    created () {
      api.getSales()
      .then((sales) => {
        this.sales = sales
      })
    },
    mounted () {
      store.commit('title', 'Market')
    },
    methods: {
      info () {
        this.$refs['info'].open()
      },
      close () {
        this.$refs['info'].close()
      },
      select (sale) {
        this.selected = sale
        this.info()
      },
      item (sale) {
        return sale.Planet || sale.Ship || sale.Relic || {}
      },
      buy () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.sales.filter((sale) => {
          return sale.Relic
            ? sale.Relic.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
            : sale.Planet
              ? sale.Planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
              : sale.Ship.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>