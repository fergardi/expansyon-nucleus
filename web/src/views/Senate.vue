<template lang="pug">
  md-layout
    
    md-layout(v-for="referendum in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="referendum.class")
        md-card-header
          .md-title {{ referendum.name }}
        md-card-media
          img(v-bind:src="referendum.image")
        md-card-content.no-padding.center
          md-progress(v-bind:md-progress="referendum.metal", v-bind:class="referendum.metal >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.crystal", v-bind:class="referendum.crystal >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.oil", v-bind:class="referendum.oil >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.size", v-bind:class="referendum.size >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.energy", v-bind:class="referendum.energy >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.influence", v-bind:class="referendum.influence >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.attack", v-bind:class="referendum.attack >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.defense", v-bind:class="referendum.defense >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.speed", v-bind:class="referendum.speed >= 50 ? 'green' : 'red'")
        md-card-content.center
          span {{ referendum.description | lorem }}
        md-card-content.center
          md-button.md-raised.md-fab.md-mini.md-warn
            md-icon close
          md-button.md-raised.md-fab.md-mini.md-accent
            md-icon done
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        referendums: []
      }
    },
    created () {
      api.getReferendums()
      .then((data) => {
        this.referendums = data
      })
    },
    mounted () {
      vuex.state.name = 'Senate'
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.referendums.filter((referendum) => {
          return referendum.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>