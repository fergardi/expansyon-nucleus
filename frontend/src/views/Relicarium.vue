<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-content
          span {{ selected.description }}
        md-card-actions
          md-button.md-icon-button.md-accent(v-on:click.native="activate()")
            md-icon done
    
    md-layout(v-for="relic in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")

      md-card.md-primary.card(v-bind:class="relic.class", md-with-hover, v-on:click.native="select(relic)")
        md-card-header
          .md-title {{ relic.name }}
        md-card-media
          img(v-bind:src="relic.image")
        md-card-content.center
          span {{ relic.description | lorem }}
        md-card-content.center
          md-button.md-raised.md-fab.md-mini.md-accent
            md-icon done

    md-layout(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title You have no relics.
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        relics: [],
        selected: {}
      }
    },
    created () {
      api.getPlayer(vuex.state.player.id)
      .then((player) => {
        this.relics = player.Relics
      })
    },
    mounted () {
      vuex.commit('title', 'Relicarium')
    },
    metdhos: {
      open () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
      },
      select (relic) {
        this.selected = relic
        this.open()
      },
      activate () {
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
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>