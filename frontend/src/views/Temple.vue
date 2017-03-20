<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-content {{ selected.description }}
        md-card-content
          md-chip.pink {{ selected.aether | format }} Aether
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
          md-button.md-dense.md-accent(v-on:click.native="join()") Join

    md-layout(v-for="faction in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")

      md-card.md-primary.card(v-bind:class="faction.class", md-with-hover, v-on:click.native="select(faction)")
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
        md-card-content
          span {{ faction.description }}
        md-card-content
          md-chip.pink {{ faction.aether | format }} Aether
</template>

<script>
  import api from '../services/api'
  import store from '../vuex/store'

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
      store.commit('title', 'Temple')
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
        return store.state.search
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