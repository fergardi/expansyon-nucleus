<template lang="pug">
  md-table-card
    md-table(md-sort="influence")
      
      md-table-header
        md-table-row
          md-table-head(md-sort-by="name") Name
          md-table-head(md-sort-by="members", md-numeric) Members

      md-table-body
        md-table-row(v-for="guild in filtered", md-auto-select, v-bind:md-item="guild", v-on:click.native="popup(guild)")
          md-table-cell {{ guild.name }}
          md-table-cell(md-numeric) {{ guild.members }}

      md-dialog(ref='popup')
        md-dialog-title {{ selected.name }}
        md-dialog-content {{ selected.description | lorem }}
        md-dialog-content
          md-chip {{ selected.members }} members
        md-dialog-actions
          md-button.md-icon-button(v-on:click.native="close()")
            md-icon.md-warn close
          md-button.md-icon-button(v-on:click.native="apply()")
            md-icon.md-accent person_add
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/guild'

  export default {
    data () {
      return {
        guilds: [],
        selected: {}
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
    methods: {
      popup (guild) {
        this.selected = guild
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
        return this.guilds.filter((guild) => {
          return guild.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>