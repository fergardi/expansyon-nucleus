<template lang="pug">
  md-layout
  
    md-dialog(ref='info')
      md-card.md-primary(v-bind:class="item(selected).class")
        md-card-header
          .md-title
            span {{ item(selected).name | i18n }}
            md-chip(v-if="selected.quantity > 0") {{ selected.quantity | format }}
        md-card-content
          span {{ item(selected).description | i18n }}
        md-card-content
          md-chip(v-if="selected.metal > 0") {{ selected.metal | format }} {{ 'resource.metal' | i18n }}
          md-chip(v-if="selected.crystal > 0") {{ selected.crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip(v-if="selected.oil > 0") {{ selected.oil | format }} {{ 'resource.oil' | i18n }}
          md-chip.pink(v-if="selected.aether > 0") {{ selected.aether | format }} {{ 'resource.aether' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="buy()") {{ 'button.buy' | i18n }}

    md-layout(v-for="sale in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")

      md-card.md-primary.card(v-bind:class="item(sale).class", md-with-hover, v-on:click.native="select(sale)")
        md-card-header.center
          .md-title
            span {{ item(sale).name | i18n }}
            md-chip(v-if="sale.quantity > 0") {{ sale.quantity | format }}
            md-chip(v-if="sale.Planet") {{ sale.Planet.total | format }}
          .md-title
            md-chip(v-bind:class="color(sale.Player)") {{ sale.Player.name }}
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
          md-chip(v-if="item(sale).moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="item(sale).station") {{ 'resource.station' | i18n }}
        md-card-content.center(v-if="item(sale).description")
          span {{ item(sale).description | i18n }}
        md-card-content.center
          md-chip(v-if="sale.metal > 0") {{ sale.metal | format }} {{ 'resource.metal' | i18n }}
          md-chip(v-if="sale.crystal > 0") {{ sale.crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip(v-if="sale.oil > 0") {{ sale.oil | format }} {{ 'resource.oil' | i18n }}
          md-chip.pink(v-if="sale.aether > 0") {{ sale.aether | format }} {{ 'resource.aether' | i18n }}

    md-layout.center(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-chip.red {{ 'filter.nothing' | i18n }}
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
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.market')
    },
    sockets: {
      market () {
        this.refresh()
      }
    },
    methods: {
      refresh () {
        api.getSales()
        .then((sales) => {
          this.sales = sales
        })
      },
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
      },
      color (player) {
        return player.Faction
          ? player.Faction.class
          : ''
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.sales.filter((sale) => {
          return sale.Relic
            ? this.$t(sale.Relic.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
            : sale.Planet
              ? sale.Planet.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
              : this.$t(sale.Ship.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>