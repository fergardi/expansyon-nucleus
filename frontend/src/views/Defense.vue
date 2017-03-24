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
              md-input(type="number", v-model="quantity", min="1", required)
          md-card-content
            md-chip {{ (selected.metal * quantity) | format }} {{ 'resource.metal' | i18n }}
            md-chip {{ (selected.crystal * quantity) | format }} {{ 'resource.crystal' | i18n }}
            md-chip {{ (selected.oil * quantity) | format }} {{ 'resource.oil' | i18n }}
          md-card-actions
            md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
            md-button.md-dense.md-warn(v-on:click.native="clear()") {{ 'button.clear' | i18n }}
            md-button.md-dense.md-accent(type="submit", v-bind:disabled="!can") {{ 'button.build' | i18n }}

    md-layout(v-for="tower in filtered", md-flex-xlarge="25", md-flex-medium="50", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="tower.class", md-with-hover, v-on:click.native="select(tower)")
        md-card-header
          .md-title {{ tower.name | i18n }} ({{ tower.PlayerTower.quantity | format }})
        md-card-media
          img(v-bind:src="tower.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="tower.attack")
          md-progress(v-bind:md-progress="tower.defense")
          md-progress(v-bind:md-progress="tower.speed")
        md-card-content.center
          span {{ tower.description }}
        md-card-content.center
          md-chip {{ tower.metal | format }} {{ 'resource.metal' | i18n }}
          md-chip {{ tower.crystal | format }} {{ 'resource.crystal' | i18n }}
          md-chip {{ tower.oil | format }} {{ 'resource.oil' | i18n }}

    md-layout(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title {{ 'filter.nothing' | i18n }}
</template>

<script>
  import api from '../services/api'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        towers: [],
        selected: {},
        metal: 0,
        crystal: 0,
        oil: 0,
        quantity: 0
      }
    },
    created () {
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.defense')
    },
    sockets: {
      defense () {
        this.close()
        this.refresh()
      }
    },
    methods: {
      refresh () {
        api.getPlayer(store.state.account.id)
        .then((player) => {
          this.towers = player.Towers
        })
      },
      form () {
        this.$refs['form'].open()
      },
      close () {
        this.$refs['form'].close()
      },
      clear () {
        this.quantity = 0
      },
      select (tower) {
        this.selected = tower
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
        return this.towers.filter((tower) => {
          return this.$t(tower.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      can () {
        return true
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>