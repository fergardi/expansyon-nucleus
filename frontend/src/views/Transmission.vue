<template lang="pug">
  md-table-card
    md-table(md-sort="date", v-on:sort="order")

      md-table-header
        md-table-row
          md-table-head(md-sort-by="From.name", md-tooltip="Origin of the transmission") From
          md-table-head(md-sort-by="subject", md-tooltip="Title of the transmission") Subject
          md-table-head.hide(md-sort-by="text", md-tooltip="Content of the transmission") Text
          md-table-head.hide(md-sort-by="date", md-numeric, md-tooltip="Date of the transmission") Date

      md-table-body
        md-table-row(v-for="message in ordered", md-auto-select, v-bind:md-item="message", v-on:click.native="popup(message)")
          md-table-cell
            md-chip(v-bind:class="color(message.From.Faction)") {{ message.From.name }}
          md-table-cell {{ message.subject }}
          md-table-cell.hide {{ message.text }}
          md-table-cell.hide.md-numeric {{ message.datetime | date }}

      md-dialog(ref='popup')
        md-dialog-title {{ selected.subject }}
        md-dialog-content 
          md-chip(v-bind:class="color(selected.From.Faction)") {{ selected.From.name }}
        md-dialog-content {{ selected.datetime | date }}
        md-dialog-content {{ selected.text }}
        md-dialog-actions
          md-button.md-icon-button.md-warn(v-on:click.native="remove()")
            md-icon delete
          md-button.md-icon-button.md-accent(v-on:click.native="close()")
            md-icon done
</template>

<script>
  import api from '../services/api'
  import _ from 'lodash'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        messages: [],
        field: 'date',
        direction: 'desc',
        selected: {
          From: {}
        }
      }
    },
    created () {
      api.getPlayer(vuex.state.player.id)
      .then((player) => {
        this.messages = player.Received
      })
      console.log(this.messages)
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
      order (column) {
        this.field = column.name
        this.direction = column.type
      },
      color (faction) {
        return faction ? faction.class : 'grey'
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.messages.filter((message) => {
          return message.From.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || message.subject.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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