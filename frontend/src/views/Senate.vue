<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-card.md-primary
        md-card-header
          .md-title {{ selected.name | i18n }}
        md-card-content
          span {{ selected.description }}
        md-card-content.center
          md-chip.pink {{ selected.aether | format }} {{ 'resource.aether' | i18n }}
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="vote()", v-bind:disabled="!can(selected.aether)") {{ 'button.vote' | i18n }}
    
    md-layout(v-for="referendum in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="100")
      md-card.md-primary.card(v-bind:class="referendum.class", md-with-hover, v-on:click.native="select(referendum)")
        md-card-header
          .md-title {{ referendum.name | i18n }} ({{ referendum.votes | format }})
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
        md-card-content.center
          span {{ referendum.description }}
        md-card-content.center
          md-chip.pink {{ referendum.aether | format }} {{ 'resource.aether' | i18n }}

    md-layout.center(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-chip.red {{ 'filter.nothing' | i18n }}
</template>

<script>
  import api from '../services/api'
  import notification from '../services/notification'
  import store from '../vuex/store'

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
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.senate')
    },
    sockets: {
      senate () {
        this.close()
        this.refresh()
      }
    },
    methods: {
      refresh () {
        api.getReferendums()
        .then((referendums) => {
          this.referendums = referendums
        })
      },
      confirm () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
      },
      select (referendum) {
        this.selected = referendum
        this.confirm()
      },
      vote () {
        api.voteReferendum(store.state.player.id, this.selected.id)
        .then((result) => {
          notification.success('notification.senate.ok')
        })
        .catch((error) => {
          console.error(error)
          notification.error('notification.senate.error')
        })
        .then(() => {
          this.close()
        })
      },
      can (aether) {
        return store.state.player.aether >= aether
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      filtered () {
        return this.referendums.filter((referendum) => {
          return this.$t(referendum.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>