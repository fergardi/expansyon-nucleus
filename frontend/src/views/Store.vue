<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-card.md-primary
        md-card-header
          .md-title {{ selected.name | i18n }}
        md-card-content
          span {{ selected.description }}
        md-card-content.center
          md-chip.pink {{ selected.aether | format }} {{ 'resource.aether' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="buy()", v-bind:disabled="!can(selected.aether)") {{ 'button.buy' | i18n }}
    
    md-layout(v-for="relic in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
    
      md-card.md-primary.card(v-bind:class="relic.class", md-with-hover, v-on:click.native="select(relic)")
        md-card-header
          .md-title {{ relic.name | i18n }}
        md-card-media
          img(v-bind:src="relic.image")
        md-card-content.center(v-if="relic.moon || relic.station || relic.planet")
          md-chip(v-if="relic.moon") {{ 'resource.moon' | i18n }}
          md-chip(v-if="relic.station") {{ 'resource.station' | i18n }}
          md-chip(v-if="relic.planet") {{ 'resource.planet' | i18n }}
        md-card-content.center
          span {{ relic.description }}
        md-card-content.center
          md-chip.pink {{ relic.aether | format }} {{ 'resource.aether' | i18n }}

    md-layout(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title {{ 'filter.nothing' | i18n }}
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
          this.refresh()
          notification.success('notification.store.ok')
        })
        .catch((error) => {
          console.error(error)
          this.refresh()
          notification.warning('notification.store.error')
        })
        this.close()
      },
      can (aether) {
        return store.state.player.aether >= aether
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