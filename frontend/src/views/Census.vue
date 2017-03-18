<template lang="pug">
  md-table-card

    md-dialog(ref="info")
      md-card.md-primary.grey
        md-card-header
          .md-title {{ selected.name }}
        md-card-content(v-if="selected.Faction")
          md-chip(v-bind:class="selected.Faction.class") {{ selected.Faction.name }}
        md-card-content
          md-chip {{ selected.influence }} influence
          md-chip {{ selected.planets }} planets
        md-card-actions
          md-button.md-icon-button.md-warn(v-on:click.native="enemy()")
            md-icon person_add
          md-button.md-icon-button.md-accent(v-on:click.native="friend()")
            md-icon person_add

    md-tabs(md-fixed, v-on:change="clear")
      md-tab#players.no-padding(md-label="Players")

        md-table(md-sort="influence", v-on:sort="order")

          md-table-header
            md-table-row
              md-table-head(md-sort-by="name", md-tooltip="Name of the player") Name
              md-table-head(md-sort-by="influence", md-numeric, md-tooltip="Ammount of influence of the player") Influence
              md-table-head(md-sort-by="planets", md-numeric, md-tooltip="Number of planets of the player") Planets

          md-table-body
            md-table-row(v-for="player in ordered", md-auto-select, v-bind:md-item="player", v-on:click.native="info(player)")
              md-table-cell
                md-chip(v-bind:class="player.class") {{ player.name }}
              md-table-cell(md-numeric)
                md-chip {{ player.influence }}
              md-table-cell(md-numeric)
                md-chip {{ player.planets }}

      md-tab#friends.no-padding(md-label="Friends")
        
        md-table(md-sort="influence", v-on:sort="order")

          md-table-header
            md-table-row
              md-table-head(md-sort-by="name", md-tooltip="Name of the player") Name
              md-table-head(md-sort-by="influence", md-numeric, md-tooltip="Ammount of influence of the player") Influence
              md-table-head(md-sort-by="planets", md-numeric, md-tooltip="Number of planets of the player") Planets

          md-table-body
            md-table-row(v-for="player in ordered", md-auto-select, v-bind:md-item="player", v-on:click.native="info(player)")
              md-table-cell
                md-chip(v-bind:class="player.class") {{ player.name }}
              md-table-cell(md-numeric)
                md-chip {{ player.influence }}
              md-table-cell(md-numeric)
                md-chip {{ player.planets }}

      md-tab#enemies.no-padding(md-label="Enemies")
        
        md-table(md-sort="influence", v-on:sort="order")

          md-table-header
            md-table-row
              md-table-head(md-sort-by="name", md-tooltip="Name of the player") Name
              md-table-head(md-sort-by="influence", md-numeric, md-tooltip="Ammount of influence of the player") Influence
              md-table-head(md-sort-by="planets", md-numeric, md-tooltip="Number of planets of the player") Planets

          md-table-body
            md-table-row(v-for="player in ordered", md-auto-select, v-bind:md-item="player", v-on:click.native="info(player)")
              md-table-cell
                md-chip(v-bind:class="player.class") {{ player.name }}
              md-table-cell(md-numeric)
                md-chip {{ player.influence }}
              md-table-cell(md-numeric)
                md-chip {{ player.planets }}       
</template>

<script>
  import api from '../services/api'
  import _ from 'lodash'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        players: [],
        field: 'influence',
        direction: 'desc',
        selected: {
          Faction: {}
        }
      }
    },
    created () {
      api.getPlayers()
      .then((players) => {
        this.players = players
      })
    },
    mounted () {
      vuex.state.title = 'Census'
    },
    methods: {
      info (player) {
        this.selected = player
        this.open()
      },
      open () {
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
        vuex.state.search = ''
      }
    },
    computed: {
      search () {
        return vuex.state.search
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