<template lang="pug">
  md-layout

    md-dialog(ref='info')
      md-card.md-primary(v-bind:class="selected.class")
        md-card-header
          .md-title {{ selected.name | i18n }}
        md-card-content
          span {{ selected.description }}
        md-card-actions
          md-button.md-dense.md-accent(v-on:click.native="close()") {{ 'button.close' | i18n }}

    md-dialog(ref='confirm')
      md-card.md-primary
        md-card-header
          .md-title Confirm
        md-card-content
          span Are you sure to change your password?
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") {{ 'button.cancel' | i18n }}
          md-button.md-dense.md-accent(v-on:click.native="change()") Change

    md-layout(v-for="achievement in filtered", md-flex-xlarge="33", md-flex-large="33", md-flex-medium="33", md-flex-small="50", md-flex-xsmall="50")
      md-card.md-primary.card(v-bind:class="achievement.class", md-with-hover, v-on:click.native="select(achievement)")
        md-card-header
          .md-title {{ achievement.name | i18n }}
        md-card-media
          img(v-bind:src="achievement.image")
        md-card-content.center
          span {{ achievement.description }}
        md-card-content.center
          md-chip.pink {{ achievement.aether | format }} {{ 'resource.aether' | i18n }}

    md-layout.center(v-if="!filtered.length", md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-chip.red {{ 'filter.nothing' | i18n }}

    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card
        form(v-on:submit.stop.prevent="confirm()")
          md-card-header
            .md-title Change password
          md-card-content
            md-input-container(md-has-password)
              md-icon lock_outline
              label Old password
              md-input(type="password", v-model="password.outdated", required)
            md-input-container(md-has-password)
              md-icon lock_open
              label New password
              md-input(type="password", v-model="password.updated", required)
            md-input-container(md-has-password, v-bind:class="{ 'md-input-invalid' : !match }")
              md-icon lock
              label Repeat password
              md-input(type="password", v-model="password.repeat", required)
          md-card-actions
            md-button.md-dense.md-warn(type="reset") {{ 'button.clear' | i18n }}
            md-button.md-dense.md-accent(type="submit") Change
</template>

<script>
  import api from '../services/api'
  import store from '../vuex/store'

  export default {
    data () {
      return {
        achievements: [],
        selected: {},
        password: {
          outdated: '',
          updated: '',
          repeat: ''
        }
      }
    },
    created () {
      this.refresh()
    },
    mounted () {
      store.commit('title', 'title.profile')
    },
    methods: {
      refresh () {
        api.getPlayer(store.state.player.id)
        .then((player) => {
          this.achievements = player.Achievements
        })
      },
      select (achievement) {
        this.selected = achievement
        this.info()
      },
      info () {
        this.$refs['info'].open()
      },
      confirm () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
        this.$refs['info'].close()
      },
      change () {
        // TODO
        this.close()
      }
    },
    computed: {
      search () {
        return store.state.search
      },
      match () {
        return this.password.updated === this.password.repeat
      },
      filtered () {
        return this.achievements.filter((achievement) => {
          return this.$t(achievement.name).toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .md-card
    .md-title
      font-size 20px
</style>
