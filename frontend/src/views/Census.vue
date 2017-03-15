<template lang="pug">
  md-table-card
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

      md-dialog(ref="info")
        md-dialog-title {{ selected.name }}
        md-dialog-content {{ selected.faction }}
        md-dialog-actions
          md-button.md-icon-button.md-warn(v-on:click.native="close('info')")
            md-icon close
          md-button.md-icon-button.md-accent(v-on:click.native="form()")
            md-icon send

      md-dialog(ref="form")
        md-dialog-title Send message
        md-dialog-content {{ selected.name }}
        md-dialog-content
          form
            md-input-container
              label Subject
              md-input(type="text", v-model="message.subject")
            md-input-container
              label Text
              md-textarea(v-model="message.text")
        md-dialog-actions
          md-button.md-icon-button.md-warn(v-on:click.native="close('form')")
            md-icon close
          md-button.md-icon-button.md-accent(v-on:click.native="send()")
            md-icon done
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
        selected: {},
        message: {
          subject: '',
          text: ''
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
        this.$refs['info'].open()
      },
      close (ref) {
        this.$refs[ref].close()
      },
      form () {
        this.close('info')
        this.$refs['form'].open()
      },
      send () {
        // TODO
        this.close('form')
      },
      order (column) {
        this.field = column.name
        this.direction = column.type
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