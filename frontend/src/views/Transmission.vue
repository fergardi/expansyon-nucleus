<template lang="pug">
  md-table-card

    md-dialog(ref='info')
      md-card.md-primary.grey
        md-card-header
          .md-title {{ selected.subject }}
        md-card-content
          span {{ selected.text | lorem }}
        md-card-content.center
          md-chip(v-bind:class="color(selected)") {{ name(selected) }}
          md-chip {{ selected.datetime | date }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-warn(v-on:click.native="remove") {{ 'button.delete' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="reply") {{ 'button.reply' | i18n }}

    md-tabs(md-fixed)
      md-tab#received.no-padding(v-bind:md-label="$t('tab.received')")

        md-table(md-sort="datetime", v-on:sort="order")
          md-table-header
            md-table-row
              md-table-head(md-sort-by="From.name") {{ 'table.from' | i18n }}
              md-table-head(md-sort-by="subject") {{ 'table.subject' | i18n }}
              md-table-head.hide(md-sort-by="text") {{ 'table.text' | i18n }}
              md-table-head.md-numeric(md-sort-by="datetime") {{ 'table.datetime' | i18n }}

          md-table-body
            md-table-row(v-for="message in receivedOrdered", md-auto-select, v-bind:md-item="message", v-on:click.native="select(message)")
              md-table-cell
                md-chip(v-bind:class="color(message)") {{ message.From.name }}
              md-table-cell {{ message.subject }}
              md-table-cell.hide {{ message.text | lorem }}
              md-table-cell.md-numeric {{ message.datetime | date }}

            md-table-row(v-if="!receivedOrdered.length")
              md-table-cell {{ 'filter.nothing' | i18n }}

      md-tab#sent.no-padding(v-bind:md-label="$t('tab.sent')")

        md-table(md-sort="datetime", v-on:sort="order")
          md-table-header
            md-table-row
              md-table-head(md-sort-by="To.name") {{ 'table.to' | i18n }}
              md-table-head(md-sort-by="subject") {{ 'table.subject' | i18n }}
              md-table-head.hide(md-sort-by="text") {{ 'table.text' | i18n }}
              md-table-head.md-numeric(md-sort-by="datetime") {{ 'table.datetime' | i18n }}

          md-table-body
            md-table-row(v-for="message in sentOrdered", md-auto-select, v-bind:md-item="message", v-on:click.native="select(message)")
              md-table-cell
                md-chip(v-bind:class="color(message)") {{ message.To.name }}
              md-table-cell {{ message.subject }}
              md-table-cell.hide {{ message.text | lorem }}
              md-table-cell.md-numeric {{ message.datetime | date }}

            md-table-row(v-if="!sentOrdered.length")
              md-table-cell {{ 'filter.nothing' | i18n }}

      md-tab#new(v-bind:md-label="$t('tab.create')")

        form(v-on:submit.stop.prevent="send")
          md-input-container
            label {{ 'transmission.to' | i18n }}
            md-select(name="to", id="to", v-model="to", required)
              md-option(v-for="player in players", v-bind:value="player.id") {{ player.name }}
          md-input-container
            label {{ 'transmission.from' | i18n }}
            md-input(type="text", v-model="message.subject", required)
          md-input-container
            label {{ 'transmission.text' | i18n }}
            md-textarea(v-model="message.text", maxlength="140", required)
          md-card-actions
            md-button.md-dense.md-warn(type="reset") {{ 'button.clear' | i18n }}
            md-button.md-dense.md-accent(type="submit") {{ 'button.send' | i18n }}
</template>

<script>
  import api from '../services/api'
  import _ from 'lodash'
  import store from '../vuex/store'

  export default {
    name: 'Transmission',
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
      api.getPlayer(store.state.account.id)
      .then((player) => {
        this.received = player.Received
        this.sent = player.Sent
      })
    },
    mounted () {
      store.commit('title', 'title.transmission')
    },
    methods: {
      select (message) {
        this.selected = message
        this.$refs['info'].open()
      },
      close () {
        this.$refs['info'].close()
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
      name (message) {
        return message.From
          ? message.From.name
          : message.To.name
      }
    },
    computed: {
      search () {
        return store.state.search
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