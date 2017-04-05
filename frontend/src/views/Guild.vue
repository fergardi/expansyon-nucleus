<template lang="pug">
  md-table-card

    md-dialog(ref='confirm')
      md-card.md-primary
        md-card-header
          .md-title {{ 'dialog.confirm.title' | i18n }}
        md-card-content
          span {{ 'dialog.confirm.description' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="leave()") {{ 'button.confirm' | i18n }}

    md-dialog(ref='info')
      md-card.md-primary.grey
        md-card-header
          .md-title
            span {{ selected.name }}
            md-chip {{ selected.Players.length | format }}
        md-card-content
          span {{ selected.description }}
        md-card-content
          md-chip {{ selected.members | format }} {{ 'guild.members' | i18n }}
          md-chip {{ selected.influence | format }} {{ 'guild.influence' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="apply()") {{ 'button.join' | i18n }}

    md-tabs(md-fixed, v-on:change="clear")
      md-tab#guilds.no-padding(v-bind:md-label="$t('tab.guilds')")

        md-table(md-sort="influence", md-sort-type="desc", v-on:sort="order")
          
          md-table-header
            md-table-row
              md-table-head(md-sort-by="name") {{ 'table.name' | i18n }}
              md-table-head.hide(md-sort-by="description") {{ 'table.description' | i18n }}
              md-table-head.md-numeric(md-sort-by="members") {{ 'table.members' | i18n }}
              md-table-head.md-numeric(md-sort-by="influence") {{ 'table.influence' | i18n }}

          md-table-body
            md-table-row(v-for="guild in ordered", md-auto-select, v-bind:md-item="guild", v-on:click.native="info(guild)")
              md-table-cell
                md-chip {{ guild.name }}
              md-table-cell.hide {{ guild.description }}
              md-table-cell.md-numeric
                md-chip {{ guild.members | format }}
              md-table-cell.md-numeric
                md-chip {{ guild.influence | format }}

            md-table-row(v-if="!ordered.length")
              md-table-cell {{ 'filter.nothing' | i18n }}

      md-tab#myguild.no-padding(v-bind:md-label="$t('tab.guild')")
        md-list
          md-list-item
            .md-title {{ guild.name }}
          md-list-item
            md-icon trending_up
            span {{ 'guild.ranking' | i18n }}
            md-chip {{ guild.ranking | format }}
          md-list-item
            md-icon star
            span {{ 'guild.influence' | i18n }}
            md-chip {{ guild.influence | format }}
          md-list-item
            md-icon person_add
            span {{ 'guild.members' | i18n }}
            md-chip {{ guild.members | format }}
        md-card-actions
          md-button.md-dense.md-accent(v-on:click.native="confirm()") {{ 'button.leave' | i18n }}
</template>

<script>
  import api from '../services/api'
  import _ from 'lodash'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        guilds: [],
        guild: {
          name: '',
          ranking: 0,
          influence: 0,
          members: 0
        },
        selected: {
          Players: []
        },
        field: 'influence',
        direction: 'desc'
      }
    },
    created () {
      api.getGuilds()
      .then((guilds) => {
        this.guilds = guilds
        if (store.state.player.Guild) this.guild = this.guilds.find((guild) => guild.id === store.state.player.Guild.id)
      })
    },
    mounted () {
      store.commit('title', 'title.guild')
    },
    methods: {
      info (guild) {
        this.selected = guild
        this.$refs['info'].open()
      },
      close () {
        this.$refs['info'].close()
        this.$refs['confirm'].close()
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
        this.close()
      },
      clear () {
        store.state.search = ''
      }
    },
    computed: {
      search () {
        return store.state.search
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
