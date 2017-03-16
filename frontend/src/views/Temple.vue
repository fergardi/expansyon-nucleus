<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-dialog-title {{ selected.name }}
      md-dialog-content {{ selected.description }}
      md-dialog-content.center
        md-chip.pink {{ selected.aether | price }} Aether
      md-dialog-actions
        md-button.md-icon-button.md-accent(v-on:click.native="join()")
          md-icon done

    md-layout(v-for="faction in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")

      md-card.md-primary.card(v-bind:class="faction.class")
        md-card-header
          .md-title {{ faction.name }}
        md-card-media
          img(v-bind:src="faction.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="faction.metal")
          md-progress(v-bind:md-progress="faction.crystal")
          md-progress(v-bind:md-progress="faction.oil")
          md-progress(v-bind:md-progress="faction.size")
          md-progress(v-bind:md-progress="faction.energy")
          md-progress(v-bind:md-progress="faction.influence")
          md-progress(v-bind:md-progress="faction.attack")
          md-progress(v-bind:md-progress="faction.defense")
          md-progress(v-bind:md-progress="faction.speed")
        md-card-content.center
          span {{ faction.description }}
        md-card-content.padding.center
          md-chip.pink {{ faction.aether | price }} Aether
        md-card-content.padding.center
          md-button.md-raised.md-fab.md-mini.md-accent(v-on:click.native="select(faction)")
            md-icon done
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        factions: [],
        selected: {
          aether: 0
        }
      }
    },
    created () {
      api.getFactions()
      .then((factions) => {
        this.factions = factions
      })
    },
    mounted () {
      vuex.state.title = 'Guild'
    },
    methods: {
      open () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
      },
      select (faction) {
        this.selected = faction
        this.open()
      },
      join () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.factions.filter((faction) => {
          return faction.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>