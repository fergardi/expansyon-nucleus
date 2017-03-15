<template lang="pug">
  md-layout
    
    md-layout(v-for="artifact in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="artifact.class")
        md-card-header
          .md-title {{ artifact.name }}
        md-card-media
          img(v-bind:src="artifact.image")
        md-card-content.center
          span {{ artifact.description | lorem }}
        md-card-content.center
          md-button.md-raised.md-fab.md-mini.md-accent
            md-icon done
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        artifacts: []
      }
    },
    created () {
      api.getPlayer(vuex.state.id)
      .then((player) => {
        this.artifacts = player.Artifacts
      })
    },
    mounted () {
      vuex.state.title = 'Relicarium'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.artifacts.filter((artifact) => {
          return artifact.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>