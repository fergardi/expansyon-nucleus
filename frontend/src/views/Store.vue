<template lang="pug">
  md-layout

    md-dialog(ref='buy')
      md-card.md-primary
        md-card-header
          .md-title {{ selected.name }}
        md-card-content {{ selected.description }}
        md-card-content.center
          md-chip.pink {{ selected.aether | price }} Aether
        md-card-actions
          md-button.md-icon-button.md-accent(v-on:click.native="buy()", v-bind:disabled="!can")
            md-icon done
    
    md-layout(v-for="artifact in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="artifact.class", md-with-hover, v-on:click.native="select(artifact)")
        md-card-header
          .md-title {{ artifact.name }}
        md-card-media
          img(v-bind:src="artifact.image")
        md-card-content.center
          span {{ artifact.description }}
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        artifacts: [],
        selected: {
          aether: 0
        }
      }
    },
    created () {
      api.getArtifacts()
      .then((artifacts) => {
        this.artifacts = artifacts
      })
    },
    mounted () {
      vuex.state.title = 'Store'
    },
    methods: {
      open () {
        this.$refs['buy'].open()
      },
      close () {
        this.$refs['buy'].close()
      },
      select (artifact) {
        this.selected = artifact
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
        return this.artifacts.filter((artifact) => {
          return artifact.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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