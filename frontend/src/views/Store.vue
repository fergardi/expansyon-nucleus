<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name | i18n }}
        md-card-media
          img(v-bind:src="selected.image")
        md-card-content
          span {{ selected.description | i18n }}
        md-card-content
          md-chip.pink {{ selected.aether | format }} {{ 'resource.aether' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="buy()", v-bind:disabled="!can") {{ 'button.buy' | i18n }}
    
    md-layout(v-for="relic in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
    
      md-card.md-primary.card(v-bind:class="relic.class", md-with-hover, v-on:click.native="select(relic)")
        md-card-header
          .md-title {{ relic.name | i18n }}
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
          md-chip(v-if="relic.main") {{ 'resource.main' | i18n }}
          md-chip(v-if="relic.reset") {{ 'resource.reset' | i18n }}
          md-chip(v-if="relic.metal > 0") {{ relic.metal | format }} {{ 'resource.metal' | i18n }}
          md-chip(v-if="relic.crystal > 0") {{ relic.crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip(v-if="relic.oil > 0") {{ relic.oil | format }} {{ 'resource.oil' | i18n }}
        md-card-content.center
          span {{ relic.description | i18n }}
        md-card-content.center
          md-chip.pink {{ relic.aether | format }} {{ 'resource.aether' | i18n }}

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
        relics: [],
        selected: {
          aether: 0
        }
      }
    },
    created () {
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.store')
    },
    sockets: {
      store () {
        this.refresh()
        this.close()
      }
    },
    methods: {
      refresh () {
        api.getStore()
        .then((relics) => {
          this.relics = relics
        })
      },
      confirm () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
      },
      select (relic) {
        this.selected = relic
        this.confirm()
      },
      buy () {
        api.buyStore(store.state.player.id, this.selected.id)
        .then((result) => {
          notification.success('notification.store.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.store.error')
        })
        .then(() => {
          this.close()
        })
      },
      can () {
        return this.selected.aether <= store.state.player.aether
      }
    },
    computed: {
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
