<template lang="pug">
  md-layout

    md-dialog(ref='vote')
      md-card.md-primary
        md-card-header
          .md-title {{ selected.name }}
        md-card-content {{ selected.description }}
        md-card-content
          md-chip.pink {{ selected.aether | format }} Aether
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
          md-button.md-dense.md-accent(v-on:click.native="vote()", v-bind:disabled="!can") Vote
    
    md-layout(v-for="referendum in filtered", md-flex-xlarge="25", md-flex-large="33", md-flex-medium="50", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="referendum.class", md-with-hover, v-on:click.native="select(referendum)")
        md-card-header
          .md-title {{ referendum.name }}
        md-card-media
          img(v-bind:src="referendum.image")
        md-card-content.no-padding
          md-progress(v-bind:md-progress="referendum.metal", v-bind:class="referendum.metal >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.crystal", v-bind:class="referendum.crystal >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.oil", v-bind:class="referendum.oil >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.size", v-bind:class="referendum.size >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.energy", v-bind:class="referendum.energy >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.influence", v-bind:class="referendum.influence >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.attack", v-bind:class="referendum.attack >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.defense", v-bind:class="referendum.defense >= 50 ? 'green' : 'red'")
          md-progress(v-bind:md-progress="referendum.speed", v-bind:class="referendum.speed >= 50 ? 'green' : 'red'")
        md-card-content
          span {{ referendum.description }}
        md-card-content
          md-chip.pink {{ referendum.aether | format }} Aether
</template>

<script>
  import api from '../services/api'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        referendums: [],
        selected: {
          aether: 0
        }
      }
    },
    created () {
      api.getReferendums()
      .then((referendums) => {
        this.referendums = referendums
      })
    },
    mounted () {
      vuex.commit('title', 'Senate')
    },
    methods: {
      open () {
        this.$refs['vote'].open()
      },
      close () {
        this.$refs['vote'].close()
      },
      select (referendum) {
        this.selected = referendum
        this.open()
      },
      vote () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return vuex.state.search
      },
      filtered () {
        return this.referendums.filter((referendum) => {
          return referendum.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
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