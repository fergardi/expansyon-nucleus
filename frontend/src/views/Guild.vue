<template lang="pug">
  md-table-card

    md-dialog(ref='confirm')
      md-card.md-primary.grey
        md-card-header
          .md-title Leave guild
        md-card-content Are you sure to leave this guild?
        md-card-actions
          md-button.md-icon-button.md-accent(v-on:click.native="leave()")
            md-icon done

    md-dialog(ref='popup')
      md-card.md-primary.grey
        md-card-header
          .md-title {{ selected.name }}
        md-card-content {{ selected.description | lorem }}
        md-card-content
          md-chip {{ selected.members }} members
        md-card-actions
          md-button.md-icon-button.md-accent(v-on:click.native="apply()")
            md-icon person_add

    md-tabs(md-fixed, v-on:change="clear")
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

      md-tab#myguild.no-padding(md-label="My guild")
        md-list
          md-list-item
            .md-title {{ guild.name }}
          md-list-item
            md-icon trending_up
            span Ranking
            md-chip {{ guild.ranking }}
          md-list-item
            md-icon person_add
            span Members
            md-chip {{ guild.members }}
          md-list-item
            md-icon star
            span Influence
            md-chip {{ guild.influence }}
        .center
          md-button.md-raised.md-warn.md-fab.md-mini(v-on:click.native="confirm()")
            md-icon close
</template>

<script>
  import api from '../services/api'
  import _ from 'lodash'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        guilds: [],
        guild: {
          name: 'Guild',
          members: 0,
          influence: 0,
          ranking: 0
        },
        selected: {},
        field: 'influence',
        direction: 'desc'
      }
    },
    created () {
      api.getGuilds()
      .then((guilds) => {
        this.guilds = guilds
      })
      api.getPlayer(vuex.state.player.id)
      .then((player) => {
        // this.guild = player.Guild
      })
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
      },
      apply () {
        // TODO
        this.close()
      },
      confirm () {
        this.$refs['confirm'].open()
      },
      leave () {
        // TODO
        this.$refs['confirm'].close()
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