<template lang="pug">
  md-table-card

    md-dialog(ref="info")
      md-card.md-primary(v-bind:class="color(selected)")
        md-card-header
          .md-title {{ selected.name }}
        md-card-content.center
          md-chip {{ selected.Planets.length | format }} {{ 'resource.planets' | i18n }}
          md-chip {{ selected.influence | format }} {{ 'resource.influence' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="enemy()") {{ 'button.enemy' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="friend()") {{ 'button.friend' | i18n }}

    md-tabs(md-fixed, v-on:change="clear")
      md-tab#players.no-padding(v-bind:md-label="$t('tab.players')")

        md-table(md-sort="influence", md-sort-type="desc", v-on:sort="order")

          md-table-header
            md-table-row
              md-table-head(md-sort-by="name") {{ 'table.name' | i18n }}
              md-table-head.hide {{ 'table.guild' | i18n }}
              md-table-head.md-numeric(md-sort-by="Planets.length") {{ 'table.planets' | i18n }}
              md-table-head.md-numeric(md-sort-by="influence") {{ 'table.influence' | i18n }}

          md-table-body
            md-table-row(v-for="player in ordered", md-auto-select, v-bind:md-item="player", v-on:click.native="info(player)")
              md-table-cell
                md-chip(v-bind:class="color(player)") {{ player.name }}
              md-table-cell.hide {{ guild(player) }}
              md-table-cell.md-numeric
                md-chip {{ player.Planets.length | format }}
              md-table-cell.md-numeric
                md-chip {{ player.influence | format }}

            md-table-row(v-if="!ordered.length")
              md-table-cell {{ 'filter.nothing' | i18n }}

      md-tab#friends.no-padding(v-bind:md-label="$t('tab.friends')")
        
        md-table(md-sort="influence", md-sort-type="desc", v-on:sort="order")

          md-table-header
            md-table-row
              md-table-head(md-sort-by="name") {{ 'table.name' | i18n }}
              md-table-head.hide {{ 'table.guild' | i18n }}
              md-table-head.md-numeric(md-sort-by="Planets.length") {{ 'table.planets' | i18n }}
              md-table-head.md-numeric(md-sort-by="influence") {{ 'table.influence' | i18n }}

          md-table-body
            md-table-row(v-for="player in ordered", md-auto-select, v-bind:md-item="player", v-on:click.native="info(player)")
              md-table-cell
                md-chip(v-bind:class="color(player)") {{ player.name }}
              md-table-cell.hide {{ guild(player) }}
              md-table-cell.md-numeric
                md-chip {{ player.Planets.length | format }}
              md-table-cell.md-numeric
                md-chip {{ player.influence | format }}

            md-table-row(v-if="!ordered.length")
              md-table-cell {{ 'filter.nothing' | i18n }}

      md-tab#enemies.no-padding(v-bind:md-label="$t('tab.enemies')")
        
        md-table(md-sort="influence", md-sort-type="desc", v-on:sort="order")

          md-table-header
            md-table-row
              md-table-head(md-sort-by="name") {{ 'table.name' | i18n }}
              md-table-head.hide {{ 'table.guild' | i18n }}
              md-table-head.md-numeric(md-sort-by="Planets.length") {{ 'table.planets' | i18n }}
              md-table-head.md-numeric(md-sort-by="influence") {{ 'table.influence' | i18n }}

          md-table-body
            md-table-row(v-for="player in ordered", md-auto-select, v-bind:md-item="player", v-on:click.native="info(player)")
              md-table-cell
                md-chip(v-bind:class="color(player)") {{ player.name }}
              md-table-cell.hide {{ guild(player) }}
              md-table-cell.md-numeric
                md-chip {{ player.Planets.length | format }}
              md-table-cell.md-numeric
                md-chip {{ player.influence | format }}

            md-table-row(v-if="!ordered.length")
              md-table-cell {{ 'filter.nothing' | i18n }}
</template>

<script>
  import api from '../services/api'
  import _ from 'lodash'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        players: [],
        field: 'influence',
        direction: 'desc',
        selected: {
          Faction: {},
          Planets: []
        }
      }
    },
    created () {
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.census')
    },
    sockets: {
      census () {
        this.refresh()
      }
    },
    methods: {
      refresh () {
        api.getPlayers()
        .then((players) => {
          this.players = players
        })
      },
      info (player) {
        this.selected = player
        this.$refs['info'].open()
      },
      close () {
        this.$refs['info'].close()
      },
      order (column) {
        this.field = column.name
        this.direction = column.type
      },
      friend () {
        // TODO
        this.close()
      },
      enemy () {
        // TODO
        this.close()
      },
      clear () {
        store.state.search = ''
      },
      color (player) {
        return player.Faction
          ? player.Faction.class
          : ''
      },
      guild (player) {
        return player.Guild
          ? player.Guild.name
          : ''
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.players.filter((player) => {
          return player.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      ordered () {
        return _.orderBy(this.filtered, this.field, this.direction)
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>