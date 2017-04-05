<template lang="pug">
  md-layout

    md-dialog(ref='sale')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="sell()")
          md-card-header
            .md-title
              span {{ selected.name | i18n }}
              md-chip {{ selected.PlayerShip.quantity - quantity | format }}
          md-card-content
            md-input-container(v-bind:class="{ 'md-input-invalid': !can }")
              md-icon add
              label {{ 'resource.quantity' | i18n }}
              md-input(type="number", v-model.number="quantity", min="0", v-bind:max="selected.PlayerShip.quantity", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
            md-input-container
              md-icon apps
              label {{ 'resource.metal' | i18n }}
              md-input(type="number", v-model.number="metal", min="0", required)
            md-input-container
              md-icon texture
              label {{ 'resource.crystal' | i18n }}
              md-input(type="number", v-model.number="crystal", min="0", required)
            md-input-container
              md-icon opacity
              label {{ 'resource.oil' | i18n }}
              md-input(type="number", v-model.number="oil", min="0", required)
            md-input-container
              md-icon whatshot
              label {{ 'resource.aether' | i18n }}
              md-input(type="number", v-model.number="aether", min="0", required)
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!has") {{ 'button.sell' | i18n }}

    md-dialog(ref='construct')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="build()")
          md-card-header
            .md-title
              span {{ selected.name | i18n }}
              md-chip {{ selected.PlayerShip.quantity | format }}
          md-card-content
            md-input-container(v-bind:class="{ 'md-input-invalid': !can }")
              md-icon add
              label {{ 'resource.quantity' | i18n }} ({{ (maximum - quantity) | format }})
              md-input(type="number", v-model.number="quantity", min="0", v-bind:max="maximum", required)
              span.md-error {{ 'resource.insufficient' | i18n }}
          md-card-content
            md-chip {{ (selected.metal * quantity) | format }} {{ 'resource.metal' | i18n }}
            md-chip {{ (selected.crystal * quantity) | format }} {{ 'resource.crystal' | i18n }}
            md-chip {{ (selected.oil * quantity) | format }} {{ 'resource.oil' | i18n }}
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-accent(v-on:click.native="sale()") {{ 'button.sell' | i18n }}
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
          md-progress(v-bind:md-progress="ship.aim")
          md-progress(v-bind:md-progress="ship.evasion")
          md-progress(v-bind:md-progress="ship.cargo")
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
  import api from '../services/api'
  import notification from '../services/notification'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        selected: {
          metal: 1,
          crystal: 1,
          oil: 1,
          PlayerShip: {
            quantity: 0
          }
        },
        quantity: 0,
        metal: 0,
        crystal: 0,
        oil: 0,
        aether: 0
      }
    },
    mounted () {
      store.commit('title', 'title.hangar')
    },
    methods: {
      construct () {
        this.$refs['construct'].open()
      },
      sale () {
        this.$refs['construct'].close()
        this.$refs['sale'].open()
      },
      close () {
        this.$refs['construct'].close()
        this.$refs['sale'].close()
      },
      clear () {
        this.quantity = 0
        this.metal = 0
        this.crystal = 0
        this.oil = 0
        this.aether = 0
      },
      select (ship) {
        this.selected = ship
        this.construct()
      },
      build () {
        api.buildShip(store.state.player.id, this.selected.id, this.quantity)
        .then((result) => {
          notification.success('notification.hangar.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.hangar.error')
        })
        .then(() => {
          this.clear()
          this.close()
        })
      },
      sell () {
        var sale = {
          shipId: this.selected.id,
          quantity: this.quantity,
          metal: this.metal,
          crystal: this.crystal,
          oil: this.oil,
          aether: this.aether
        }
        api.sellShip(store.state.player.id, sale)
        .then((result) => {
          notification.success('notification.hangar.sale')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.hangar.error')
        })
        .then(() => {
          this.clear()
          this.close()
        })
      }
    },
    computed: {
      player () {
        return store.state.player
      },
      ships () {
        return this.player.Ships
      },
      maximum () {
        return Math.min(Math.floor(this.player.metal / this.selected.metal), Math.floor(this.player.crystal / this.selected.crystal), Math.floor(this.player.oil / this.selected.oil))
      },
      can () {
        return this.selected.metal * this.quantity <= this.player.metal && this.selected.crystal * this.quantity <= this.player.crystal && this.selected.oil * this.quantity <= this.player.oil && this.quantity > 0 && this.quantity <= this.maximum
      },
      has () {
        return (this.quantity <= this.selected.PlayerShip.quantity && this.quantity > 0) && (this.metal > 0 || this.crystal > 0 || this.oil > 0 || this.aether > 0)
      },
      search () {
        return store.state.search
      },
      filtered () {
        return this.ships.filter((ship) => {
          return this.$t(ship.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
