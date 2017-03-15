<template lang="pug">
  md-table-card
    md-table(md-sort="date", v-on:sort="order")

      md-table-header
        md-table-row
          md-table-head(md-sort-by="title", md-tooltip="Title of the transmission") Title
          md-table-head(md-sort-by="from", md-tooltip="Origin of the transmission") From
          md-table-head.hide(md-sort-by="text", md-tooltip="Content of the transmission") Text
          md-table-head(md-sort-by="date", md-numeric, md-tooltip="Date of the transmission") Date

      md-table-body
        md-table-row(v-for="message in ordered", md-auto-select, v-bind:md-item="message", v-on:click.native="popup(message)")
          md-table-cell {{ message.title }}
          md-table-cell {{ message.from }}
          md-table-cell.hide {{ message.text | lorem }}
          md-table-cell.md-numeric {{ message.date | date }}

      md-dialog(ref='popup')
        md-dialog-title {{ selected.title }}
        md-dialog-content {{ selected.date | date }}
        md-dialog-content {{ selected.text | lorem }}
        md-dialog-actions
          md-button.md-icon-button.md-warn(v-on:click.native="remove()")
            md-icon delete
          md-button.md-icon-button.md-accent(v-on:click.native="close()")
            md-icon done
</template>

<script>
  import factory from '../factories/message'
  import _ from 'lodash'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        messages: [],
        field: 'date',
        direction: 'desc',
        selected: {}
      }
    },
    created () {
      for (var i = 0; i < 20; i++) {
        this.messages.push(factory.build())
      }
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
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.messages.filter((message) => {
          return message.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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