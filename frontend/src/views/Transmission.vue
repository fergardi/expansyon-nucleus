<template lang="pug">
  md-table-card

    md-dialog(ref='popup')
      md-card.md-primary.grey
        md-card-header
          .md-title {{ selected.subject }}
        md-card-content {{ selected.text | lorem }}
        md-card-content
          md-chip(v-bind:class="color(selected)") {{ selected.From.name || selected.To.name }}
          md-chip {{ selected.datetime | date }}
        md-card-actions
          md-button.md-icon-button.md-warn(v-on:click.native="remove()")
            md-icon delete
          md-button.md-icon-button.md-accent(v-on:click.native="reply()")
            md-icon reply

    md-tabs(md-fixed, v-on:change="clear")
      md-tab#received.no-padding(md-label="Received")

        md-table(md-sort="datetime", v-on:sort="order")
          md-table-header
            md-table-row
              md-table-head(md-sort-by="From.name", md-tooltip="Origin of the transmission") From
              md-table-head(md-sort-by="subject", md-tooltip="Title of the transmission") Subject
              md-table-head.hide(md-sort-by="text", md-tooltip="Content of the transmission") Text
              md-table-head(md-sort-by="datetime", md-numeric, md-tooltip="Date of the transmission") Date

          md-table-body
            md-table-row(v-for="message in receivedOrdered", md-auto-select, v-bind:md-item="message", v-on:click.native="popup(message)")
              md-table-cell
                md-chip(v-bind:class="color(message)") {{ message.From.name }}
              md-table-cell {{ message.subject }}
              md-table-cell.hide {{ message.text | lorem }}
              md-table-cell.md-numeric {{ message.datetime | date }}

            md-table-row(v-if="!receivedOrdered.length")
              md-table-cell You have no messages.

      md-tab#sent.no-padding(md-label="Sent")

        md-table(md-sort="datetime", v-on:sort="order")
          md-table-header
            md-table-row
              md-table-head(md-sort-by="To.name", md-tooltip="Destination of the transmission") To
              md-table-head(md-sort-by="subject", md-tooltip="Title of the transmission") Subject
              md-table-head.hide(md-sort-by="text", md-tooltip="Content of the transmission") Text
              md-table-head(md-sort-by="datetime", md-numeric, md-tooltip="Date of the transmission") Date

          md-table-body
            md-table-row(v-for="message in sentOrdered", md-auto-select, v-bind:md-item="message", v-on:click.native="popup(message)")
              md-table-cell
                md-chip(v-bind:class="color(message)") {{ message.To.name }}
              md-table-cell {{ message.subject }}
              md-table-cell.hide {{ message.text | lorem }}
              md-table-cell.md-numeric {{ message.datetime | date }}

            md-table-row(v-if="!sentOrdered.length")
              md-table-cell You have no messages.

      md-tab#new(md-label="New")

        form(v-on:submit.stop.prevent="send")
          md-input-container
            label To
            md-select(name="to", id="to", v-model="to", required)
              md-option(v-for="player in players", v-bind:value="player.id") {{ player.name }}
          md-input-container
            label Subject
            md-input(type="text", v-model="message.subject", placeholder="Subject", required)
          md-input-container
            label Text
            md-textarea(v-model="message.text", placeholder="Text", maxlength="140", required)
          .center
            md-button.md-raised.md-fab.md-mini.md-warn(type="reset")
              md-icon clear
            md-button.md-raised.md-fab.md-mini.md-accent(type="submit")
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
        received: [],
        sent: [],
        field: 'date',
        direction: 'desc',
        selected: {
          From: {},
          To: {}
        },
        message: {}
      }
    },
    created () {
      api.getPlayers()
      .then((players) => {
        this.players = players
      })
      api.getPlayer(vuex.state.player.id)
      .then((player) => {
        this.received = player.Received
        this.sent = player.Sent
      })
    },
    mounted () {
      vuex.state.title = 'Transmission'
    },
    methods: {
      popup (message) {
        this.selected = message
        this.$refs['popup'].open()
      },
      close () {
        this.$refs['popup'].close()
      },
      remove () {
        // TODO
        this.close()
      },
      reply () {
        // TODO
        this.close()
      },
      order (column) {
        this.field = column.name
        this.direction = column.type
      },
      color (message) {
        return message.From
          ? message.From.faction
            ? message.From.faction.class
            : 'grey'
          : message.To.faction
            ? message.To.faction.class
            : 'grey'
      },
      clear () {
        vuex.state.search = ''
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      receivedFiltered () {
        return this.received.filter((message) => {
          return message.From.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || message.subject.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      receivedOrdered () {
        return _.orderBy(this.receivedFiltered, this.field, this.direction)
      },
      sentFiltered () {
        return this.sent.filter((message) => {
          return message.To.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || message.subject.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      sentOrdered () {
        return _.orderBy(this.sentFiltered, this.field, this.direction)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .md-dialog
    .md-title
      word-wrap break-word
</style>