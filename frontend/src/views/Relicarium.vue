<template lang="pug">
  md-layout

    md-dialog(ref='sale')
      md-card.md-primary(v-bind:class="selected.class")
        form(v-on:submit.stop.prevent="sell()")
          md-card-header
            .md-title
              span {{ selected.name | i18n }}
              md-chip {{ selected.PlayerRelic.quantity - quantity | format }}
          md-card-content
            md-input-container(v-bind:class="{ 'md-input-invalid': !can }")
              md-icon add
              label {{ 'resource.quantity' | i18n }}
              md-input(type="number", v-model.number="quantity", min="0", v-bind:max="selected.PlayerRelic.quantity", required)
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

    md-dialog(ref='enable')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title
            span {{ selected.name | i18n }}
            md-chip {{ selected.PlayerRelic.quantity | format }}
        md-card-content
          span {{ selected.description | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="sale()") {{ 'button.sell' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="confirm()") {{ 'button.activate' | i18n }}

    md-dialog(ref='confirm')
      md-card.md-primary
        md-card-header
          .md-title {{ 'dialog.confirm.title' | i18n }}
        md-card-content
          span {{ 'dialog.confirm.description' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="activate()") {{ 'button.confirm' | i18n }}
    
    md-layout(v-for="relic in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")

      md-card.md-primary.card(v-bind:class="relic.class", md-with-hover, v-on:click.native="select(relic)")
        md-card-header
          .md-title
            span {{ relic.name | i18n }}
            md-chip {{ relic.PlayerRelic.quantity | format }}
        md-card-media
          img(v-bind:src="relic.image")
        md-card-content.center
          md-chip(v-if="relic.level > 0") {{ relic.level | format }} {{ 'resource.level' | i18n }}
          md-chip(v-if="relic.experience > 0") {{ relic.experience | format }} {{ 'resource.experience' | i18n }}
          md-chip(v-if="relic.planet") {{ 'resource.planet' | i18n }}
          md-chip(v-if="relic.ship") {{ 'resource.ship' | i18n }}
          md-chip(v-if="relic.building") {{ 'resource.building' | i18n }}
          md-chip(v-if="relic.tower") {{ 'resource.tower' | i18n }}
          md-chip(v-if="relic.moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="relic.station") {{ 'resource.station' | i18n }}
          md-chip(v-if="relic.metal > 0") {{ relic.metal | format }} {{ 'resource.metal' | i18n }}
          md-chip(v-if="relic.crystal > 0") {{ relic.crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip(v-if="relic.oil > 0") {{ relic.oil | format }} {{ 'resource.oil' | i18n }}
          md-chip.pink(v-if="relic.aether > 0") {{ relic.aether | format }} {{ 'resource.aether' | i18n }}
        md-card-content.center
          span {{ relic.description | i18n }}

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
          PlayerRelic: {
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
      store.commit('title', 'title.relicarium')
    },
    methods: {
      enable () {
        this.$refs['enable'].open()
      },
      confirm () {
        this.$refs['enable'].close()
        this.$refs['confirm'].open()
      },
      sale () {
        this.$refs['confirm'].close()
        this.$refs['sale'].open()
      },
      close () {
        this.$refs['enable'].close()
        this.$refs['confirm'].close()
        this.$refs['sale'].close()
      },
      clear () {
        this.quantity = 0
        this.metal = 0
        this.crystal = 0
        this.oil = 0
        this.aether = 0
      },
      select (relic) {
        this.selected = relic
        this.enable()
      },
      activate () {
        api.activateRelic(store.state.account.id, this.selected.id)
        .then((response) => {
          notification.success('notification.relicarium.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.relicarium.error')
        })
        .then(() => {
          this.close()
        })
      },
      sell () {
        var sale = {
          relicId: this.selected.id,
          quantity: this.quantity,
          metal: this.metal,
          crystal: this.crystal,
          oil: this.oil,
          aether: this.aether
        }
        api.sellRelic(store.state.player.id, sale)
        .then((result) => {
          notification.success('notification.relicarium.sale')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.relicarium.error')
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
      relics () {
        return this.player.Relics
      },
      has () {
        return (this.quantity <= this.selected.PlayerRelic.quantity && this.quantity > 0) && (this.metal > 0 || this.crystal > 0 || this.oil > 0 || this.aether > 0)
      },
      can () {
        return this.quantity > 0
      },
      search () {
        return store.state.search
      },
      filtered () {
        return this.relics.filter((relic) => {
          return this.$t(relic.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
