<template lang="pug">
  md-layout

    md-dialog(ref='buy')
      md-card.md-primary
        md-card-header
          .md-title {{ selected.name }}
        md-card-content {{ selected.description }}
        md-card-content
          md-chip.pink {{ selected.aether | format }} Aether
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
          md-button.md-dense.md-accent(v-on:click.native="buy()", v-bind:disabled="!can") Buy
    
    md-layout(v-for="relic in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
    
      md-card.md-primary.card(v-bind:class="relic.class", md-with-hover, v-on:click.native="select(relic)")
        md-card-header
          .md-title {{ relic.name }}
        md-card-media
          img(v-bind:src="relic.image")
        md-card-content.center(v-if="relic.moon || relic.station || relic.planet")
          md-chip(v-if="relic.moon") Moon
          md-chip(v-if="relic.station") Station
          md-chip(v-if="relic.planet") Planet
        md-card-content
          span {{ relic.description }}
        md-card-content
          md-chip.pink {{ relic.aether | format }} Aether
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        relics: [],
        selected: {
          aether: 0
        }
      }
    },
    created () {
      api.getRelics()
      .then((relics) => {
        this.relics = relics
      })
    },
    mounted () {
      vuex.commit('title', 'Store')
    },
    methods: {
      open () {
        this.$refs['buy'].open()
      },
      close () {
        this.$refs['buy'].close()
      },
      select (relic) {
        this.selected = relic
        this.open()
      },
      buy () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.relics.filter((relic) => {
          return relic.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      },
      can () {
        return true
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>