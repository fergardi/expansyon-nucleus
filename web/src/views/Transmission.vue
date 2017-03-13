<template lang="pug">
  md-table-card
    md-table(md-sort="date")

      md-table-header
        md-table-row
          md-table-head(md-sort-by="title") Title
          md-table-head(md-sort-by="from") From
          md-table-head(md-sort-by="date", md-numeric) Date

      md-table-body
        md-table-row(v-for="message in filtered", md-auto-select, v-bind:md-item="message", v-on:click.native="popup(message)")
          md-table-cell {{ message.title }}
          md-table-cell {{ message.from }}
          md-table-cell.md-numeric {{ message.date | date }}

      md-dialog(ref='popup')
        md-dialog-title {{ selected.title }}
        md-dialog-content {{ selected.date | date }}
        md-dialog-content {{ selected.text }}
        md-dialog-actions
          md-button.md-icon-button.md-warn(v-on:click.native="remove()")
            md-icon delete
          md-button.md-icon-button.md-accent(v-on:click.native="close()")
            md-icon done
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/message'

  export default {
    data () {
      return {
        messages: [],
        selected: {}
      }
    },
    created () {
      for (var i = 0; i < 20; i++) {
        this.messages.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Transmission'
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
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @media only screen and (max-width 768px)
    .hide
      display none !important
    td
      font-size 0.8em !important
</style>