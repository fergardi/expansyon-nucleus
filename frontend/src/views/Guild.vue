<template lang="pug">
  md-table-card

    md-dialog(ref='popup')
      md-card.md-primary
        md-card-header
          .md-title {{ selected.name }}
        md-card-content {{ selected.description | lorem }}
        md-card-content
          md-chip {{ selected.members }} members
        md-card-actions
          md-button.md-icon-button.md-accent(v-on:click.native="apply()")
            md-icon person_add

    md-tabs.md-fixed(v-on:change="clear")
      md-tab#guilds.no-padding(md-label="Guilds")

        md-table(md-sort="influence", v-on:sort="order")
          
          md-table-header
            md-table-row
              md-table-head(md-sort-by="name", md-tooltip="Name of the guild") Name
              md-table-head.hide(md-sort-by="description", md-tooltip="Description of the guild") Description
              md-table-head(md-sort-by="influence", md-tooltip="Influence of the guild") Influence
              md-table-head(md-sort-by="members", md-numeric, md-tooltip="Members in the guild") Members

          md-table-body
            md-table-row(v-for="guild in ordered", md-auto-select, v-bind:md-item="guild", v-on:click.native="popup(guild)")
              md-table-cell
                md-chip {{ guild.name }}
              md-table-cell.hide {{ guild.description | lorem }}
              md-table-cell(md-numeric)
                md-chip {{ guild.influence }}
              md-table-cell(md-numeric)
                md-chip {{ guild.members }}

      md-tab#myguild(md-label="My guild")
       p TODO
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
      vuex.state.title = 'Temple'
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
      },
      apply () {
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