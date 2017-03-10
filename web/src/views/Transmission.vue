<template lang="pug">
  md-table(md-sort="date")

    md-table-header
      md-table-row
        md-table-head(md-sort-by="title") Title
        md-table-head(md-sort-by="from") From
        md-table-head(md-sort-by="text") Text
        md-table-head(md-sort-by="date") Date
        md-table-head Actions

    md-table-body
      md-table-row(v-for="message in filtered")
        md-table-cell {{ message.title | lorem }}
        md-table-cell {{ message.from }}
        md-table-cell {{ message.text | lorem }}
        md-table-cell {{ message.date }}
        md-table-cell
          md-button.md-icon-button
            md-icon message
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/message'

  export default {
    data () {
      return {
        messages: []
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
</style>