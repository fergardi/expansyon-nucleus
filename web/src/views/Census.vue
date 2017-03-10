<template lang="pug">
  md-table-card
    md-table(md-sort="influence")

      md-table-header
        md-table-row
          md-table-head(md-sort-by="name") Name
          md-table-head(md-sort-by="influence", md-numeric) Influence
          md-table-head(md-sort-by="planets", md-numeric) Planets

      md-table-body
        md-table-row(v-for="player in filtered", md-auto-select, v-bind:md-item="player", v-on:click.native="info(player)")
          md-table-cell {{ player.name }}
          md-table-cell(md-numeric) {{ player.influence }}
          md-table-cell(md-numeric) {{ player.planets }}

      md-dialog(ref="info")
        md-dialog-title {{ selected.name }}
        md-dialog-content {{ selected.faction }}
        md-dialog-actions
          md-button.md-icon-button(v-on:click.native="close('info')")
            md-icon.md-warn close
          md-button.md-icon-button(v-on:click.native="form()")
            md-icon.md-accent send

      md-dialog(ref="form")
        md-dialog-title Send message
        md-dialog-content {{ selected.name }}
        md-dialog-content
          form
            md-input-container
              label Subject
              md-input(type="text", v-model="message.subject")
            md-input-container
              label Text
              md-textarea(v-model="message.text")
        md-dialog-actions
          md-button.md-icon-button(v-on:click.native="close('form')")
            md-icon.md-warn close
          md-button.md-icon-button(v-on:click.native="send()")
            md-icon.md-accent done
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/player'

  export default {
    data () {
      return {
        players: [],
        selected: {},
        message: {
          subject: '',
          text: ''
        }
      }
    },
    created () {
      for (var i = 0; i < 20; i++) {
        this.players.push(factory.build())
      }
    },
    mounted () {
      vuex.state.name = 'Census'
    },
    methods: {
      info (player) {
        this.selected = player
        this.$refs['info'].open()
      },
      close (ref) {
        this.$refs[ref].close()
      },
      form () {
        this.close('info')
        this.$refs['form'].open()
      },
      send () {
        // TODO
        this.close('form')
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.players.filter((player) => {
          return player.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>