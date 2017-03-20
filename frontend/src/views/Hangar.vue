<template lang="pug">
  md-layout

    md-dialog(ref='build')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-content
          md-input-container
            md-icon add
            label Quantity
            md-input(type="number", v-model="quantity", required)
        md-card-content.center
          md-chip {{ (selected.metal * quantity) | format }} Metal
          md-chip {{ (selected.crystal * quantity) | format }} Crystal
          md-chip {{ (selected.oil * quantity) | format }} Oil
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
          md-button.md-dense.md-accent(v-on:click.native="build()", v-bind:disabled="!can") Build

    md-layout(v-for="ship in filtered", md-flex-xlarge="25", md-flex-medium="50", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="ship.class", md-with-hover, v-on:click.native="select(ship)")
        md-card-header
          .md-title {{ ship.name }}
        md-card-media
          img(v-bind:src="ship.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="ship.attack")
          md-progress(v-bind:md-progress="ship.defense")
          md-progress(v-bind:md-progress="ship.speed")
        md-card-content
          span {{ ship.description }}
        md-card-content.center
          md-chip {{ ship.metal | format }} Metal
          md-chip {{ ship.crystal | format }} Crystal
          md-chip {{ ship.oil | format }} Oil
</template>

<script>
  import api from '../services/api'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        ships: [],
        selected: {},
        metal: 0,
        crystal: 0,
        oil: 0,
        quantity: 0
      }
    },
    created () {
      api.getShips()
      .then((ships) => {
        this.ships = ships
      })
    },
    mounted () {
      store.commit('title', 'Hangar')
    },
    methods: {
      open () {
        this.$refs['build'].open()
      },
      close () {
        this.$refs['build'].close()
      },
      select (ship) {
        this.selected = ship
        this.open()
      },
      build () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.ships.filter((ship) => {
          return ship.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      can () {
        return true // TODO
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>