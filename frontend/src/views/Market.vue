<template lang="pug">
  md-layout
  
    md-dialog(ref='confirm')
      md-dialog-title {{ item(selected).name }}
      md-dialog-content {{ item(selected).description }}
      md-dialog-content.center
        md-chip(v-if="selected.metal > 0") {{ selected.metal | price }} Metal
        md-chip(v-if="selected.crystal > 0") {{ selected.crystal | price }} Crystal
        md-chip(v-if="selected.oil > 0") {{ selected.oil | price }} Oil
        md-chip.pink(v-if="selected.aether > 0") {{ selected.aether | price }} Aether
      md-dialog-actions
        md-button.md-icon-button.md-accent(v-on:click.native="buy()")
          md-icon done

    md-layout(v-for="sale in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")

      md-card.md-primary.card(v-bind:class="item(sale).class")
        md-card-header
          .md-title {{ item(sale).name }}
        md-card-media
          img(v-bind:src="item(sale).image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="item(sale).metal", v-if="item(sale).metal")
          md-progress(v-bind:md-progress="item(sale).crystal", v-if="item(sale).crystal")
          md-progress(v-bind:md-progress="item(sale).oil", v-if="item(sale).oil")
          md-progress(v-bind:md-progress="item(sale).size", v-if="item(sale).size")
          md-progress(v-bind:md-progress="item(sale).energy", v-if="item(sale).energy")
          md-progress(v-bind:md-progress="item(sale).influence", v-if="item(sale).influence")
          md-progress(v-bind:md-progress="item(sale).attack", v-if="item(sale).attack")
          md-progress(v-bind:md-progress="item(sale).defense", v-if="item(sale).defense")
          md-progress(v-bind:md-progress="item(sale).speed", v-if="item(sale).speed")
        md-card-content.padding.center(v-if="item(sale).moon || item(sale).station")
          md-chip(v-if="item(sale).moon") Moon
          md-chip(v-if="item(sale).station") Station
        md-card-content.center(v-if="item(sale).description")
          span {{ item(sale).description }}
        md-card-content.padding.center
          md-chip(v-if="sale.metal > 0") {{ sale.metal | price }} Metal
          md-chip(v-if="sale.crystal > 0") {{ sale.crystal | price }} Crystal
          md-chip(v-if="sale.oil > 0") {{ sale.oil | price }} Oil
          md-chip.pink(v-if="sale.aether > 0") {{ sale.aether | price }} Aether
        md-card-content.padding.center
          md-button.md-raised.md-fab.md-mini.md-accent(v-on:click.native="select(sale)")
            md-icon done

    md-layout(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title No items to buy.
</template>

<script>
  import vuex from '../vuex/vuex'
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
      vuex.state.title = 'Market'
    },
    methods: {
      open () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
      },
      select (sale) {
        this.selected = sale
        this.open()
      },
      item (sale) {
        return sale.Planet || sale.Ship || sale.Artifact || {}
      },
      buy () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.sales.filter((sale) => {
          return sale.Artifact
            ? sale.Artifact.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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