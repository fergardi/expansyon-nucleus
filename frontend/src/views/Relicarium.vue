<template lang="pug">
  md-layout

    md-snackbar(ref="alert", md-duration="5000", md-position="bottom center")
      span {{ alert }}
      md-button.md-dense.md-accent(v-on:click.native="dismiss()") Close

    md-dialog(ref='confirm')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name }}
        md-card-content
          span {{ selected.description }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
          md-button.md-dense.md-accent(v-on:click.native="activate()") Activate
    
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

    md-layout(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-card.md-primary.card
        md-card-header
          .md-title No relics to show.
</template>

<script>
  import api from '../services/api'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        relics: [],
        selected: {},
        alert: ''
      }
    },
    created () {
      api.getPlayer(store.state.account.id)
      .then((player) => {
        this.relics = player.Relics
      })
    },
    mounted () {
      store.commit('title', 'title.relicarium')
    },
    methods: {
      confirm () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
        this.$refs['alert'].close()
      },
      alert () {
        this.$refs['alert'].open()
      },
      select (relic) {
        this.selected = relic
        this.confirm()
      },
      activate () {
        api.activateRelic(store.state.account.id, this.selected.id)
        .then((response) => {
          api.getPlayer(store.state.account.id)
          .then((player) => {
            this.relics = player.Relics
            this.close()
            this.message = 'Relic successfully activated'
            this.alert()
          })
        })
        .catch((error) => {
          this.message = error
          this.alert()
        })
      },
      dismiss () {
        this.$refs['alert'].close()
      }
    },
    computed: {
      search () {
        return store.state.search
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