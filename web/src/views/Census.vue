<template lang="pug">
  md-table(md-sort="influence")
    md-table-header
      md-table-row
        md-table-head(md-sort-by="name") Name
        md-table-head(md-sort-by="faction") Faction
        md-table-head(md-sort-by="influence", md-numeric) Influence
        md-table-head(md-sort-by="planets", md-numeric) Planets
        md-table-head(md-sort-by="fleet", md-numeric) Fleet
        md-table-head Actions
    md-table-body
      md-table-row(v-for="player in filtered")
        md-table-cell {{ player.name }}
        md-table-cell {{ player.faction }}
        md-table-cell(md-numeric) {{ player.influence }}
        md-table-cell(md-numeric) {{ player.planets }}
        md-table-cell(md-numeric) {{ player.fleet }}
        md-table-cell
          md-button.md-icon-button
            md-icon message
</template>

<script>
  import vuex from '../vuex/vuex.js'
  import factory from '../factories/player'

  export default {
    data () {
      return {
        players: []
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