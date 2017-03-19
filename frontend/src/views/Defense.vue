<template lang="pug">
  md-layout

    md-dialog(ref='build')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-content
          md-input-container
            md-icon add
            label Quantity
            md-input(type="number", v-model="quantity", required)
        md-card-content
          md-chip {{ (selected.metal * quantity) | price }} Metal
          md-chip {{ (selected.crystal * quantity) | price }} Crystal
          md-chip {{ (selected.oil * quantity) | price }} Oil
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
          md-button.md-dense.md-accent(v-on:click.native="build()", v-bind:disabled="!can") Build

    md-layout(v-for="tower in filtered", md-flex-xlarge="25", md-flex-medium="50", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="tower.class", md-with-hover, v-on:click.native="select(tower)")
        md-card-header
          .md-title {{ tower.name }}
        md-card-media
          img(v-bind:src="tower.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="tower.attack")
          md-progress(v-bind:md-progress="tower.defense")
          md-progress(v-bind:md-progress="tower.speed")
        md-card-content
          span {{ tower.description }}
        md-card-content
          md-chip {{ tower.metal | price }} Metal
          md-chip {{ tower.crystal | price }} Crystal
          md-chip {{ tower.oil | price }} Oil
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        towers: [],
        selected: {},
        metal: 0,
        crystal: 0,
        oil: 0
      }
    },
    created () {
      api.getTowers()
      .then((towers) => {
        this.towers = towers
      })
    },
    mounted () {
      vuex.commit('title', 'Infrastructure')
    },
    methods: {
      open () {
        this.$refs['build'].open()
      },
      close () {
        this.$refs['build'].close()
      },
      select (tower) {
        this.selected = tower
        this.open()
      },
      build () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.towers.filter((tower) => {
          return tower.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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