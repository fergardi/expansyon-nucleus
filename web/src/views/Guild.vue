<template lang="pug">
  md-table(md-sort="influence")
    md-table-header
      md-table-row
        md-table-head(md-sort-by="name") Name
        md-table-head Description
        md-table-head(md-sort-by="members", md-numeric) Members
        md-table-head Actions
    md-table-body
      md-table-row(v-for="guild in filtered")
        md-table-cell {{ guild.name }}
        md-table-cell {{ guild.description }}
        md-table-cell(md-numeric) {{ guild.members }}
        md-table-cell
          md-button.md-icon-button
            md-icon message
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/guild'

  export default {
    data () {
      return {
        guilds: []
      }
    },
    created () {
      for (var i = 0; i < 20; i++) {
        this.guilds.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Guild'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.guilds.filter((guild) => {
          return guild.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>