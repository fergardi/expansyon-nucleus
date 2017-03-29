<template lang="pug">
  md-layout

    md-dialog(ref='form')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="build()")
          md-card-header
            .md-title {{ selected.name | i18n }}
          md-card-content
            md-input-container
              md-icon add
              label {{ 'resource.quantity' | i18n }}
              md-input(type="number", v-model="quantity", min="0", required)
          md-card-content.center
            md-chip {{ (selected.metal * quantity) | format }} {{ 'resource.metal' | i18n }}
            md-chip {{ (selected.crystal * quantity) | format }} {{ 'resource.crystal' | i18n }}
            md-chip {{ (selected.oil * quantity) | format }} {{ 'resource.oil' | i18n }}
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-warn(v-on:click.native="clear()") {{ 'button.clear' | i18n }}
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!can") {{ 'button.build' | i18n }}

    md-layout(v-for="ship in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="ship.class", md-with-hover, v-on:click.native="select(ship)")
        md-card-header
          .md-title
            span {{ ship.name | i18n }}
            md-chip {{ ship.PlayerShip.quantity | format }}
        md-card-media
          img(v-bind:src="ship.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="ship.attack")
          md-progress(v-bind:md-progress="ship.defense")
          md-progress(v-bind:md-progress="ship.speed")
        md-card-content.center
          span {{ ship.description | i18n }}
        md-card-content.center
          md-chip {{ ship.metal | format }} {{ 'resource.metal' | i18n }}
          md-chip {{ ship.crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip {{ ship.oil | format }} {{ 'resource.oil' | i18n }}

    md-layout.center(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-chip.red {{ 'filter.nothing' | i18n }}
</template>

<script>
  import store from '../vuex/store'

  export default {
    data () {
      return {
        selected: {},
        metal: 0,
        crystal: 0,
        oil: 0,
        quantity: 0
      }
    },
    mounted () {
      store.commit('title', 'title.hangar')
    },
    methods: {
      form () {
        this.$refs['form'].open()
      },
      close () {
        this.$refs['form'].close()
      },
      clear () {
        this.quantity = 0
      },
      select (ship) {
        this.selected = ship
        this.form()
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
          return this.$t(ship.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      can () {
        return true // TODO
      },
      ships () {
        return store.state.player.Ships
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>