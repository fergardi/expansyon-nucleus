<template lang="pug">
  md-table-card
    md-table(md-sort="influence", v-on:sort="order")
      
      md-table-header
        md-table-row
          md-table-head(md-sort-by="name", md-tooltip="Name of the guild") Name
          md-table-head.hide(md-sort-by="description", md-tooltip="Description of the guild") Description
          md-table-head(md-sort-by="influence", md-tooltip="Influence of the guild") Influence
          md-table-head(md-sort-by="members", md-numeric, md-tooltip="Members in the guild") Members

      md-table-body
        md-table-row(v-for="guild in ordered", md-auto-select, v-bind:md-item="guild", v-on:click.native="popup(guild)")
          md-table-cell {{ guild.name }}
          md-table-cell.hide {{ guild.description | lorem }}
          md-table-cell(md-numeric)
            md-chip {{ guild.influence }}
          md-table-cell(md-numeric)
            md-chip {{ guild.members }}

    md-dialog(ref='popup')
      md-dialog-title {{ selected.name }}
      md-dialog-content {{ selected.description | lorem }}
      md-dialog-content
        md-chip {{ selected.members }} members
      md-dialog-actions
        md-button.md-icon-button.md-accent(v-on:click.native="apply()")
          md-icon person_add
</template>

<script>
  import _ from 'lodash'
  import factory from '../factories/guild'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        guilds: [],
        field: 'influence',
        direction: 'desc',
        selected: {}
      }
    },
    created () {
      for (var i = 0; i < 20; i++) {
        this.guilds.push(factory.build())
      }
    },
    mounted () {
      vuex.state.title = 'Guild'
    },
    methods: {
      popup (guild) {
        this.selected = guild
        this.$refs['popup'].open()
      },
      close () {
        this.$refs['popup'].close()
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
        return this.guilds.filter((guild) => {
          return guild.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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