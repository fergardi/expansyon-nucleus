<template lang="pug">
  md-layout

    md-dialog(ref='confirm')
      md-card.md-primary
        md-card-header
          .md-title Confirm
        md-card-content
          span Are you sure to change your password?
        md-card-actions
          md-button.md-dense.md-warn(v-on:click.native="close()") Cancel
          md-button.md-dense.md-accent(v-on:click.native="change()") Change

    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card
        form(v-on:submit.stop.prevent="confirm()")
          md-card-header
            .md-title Change password
          md-card-content
            md-input-container(md-has-password)
              md-icon lock_outline
              label Old password
              md-input(type="password", v-model="outdated", required)
            md-input-container(md-has-password)
              md-icon lock_open
              label New password
              md-input(type="password", v-model="updated", required)
            md-input-container(md-has-password, v-bind:class="{ 'md-input-invalid' : !match }")
              md-icon lock
              label Repeat password
              md-input(type="password", v-model="repeat", required)
          md-card-actions
            md-button.md-dense.md-warn(type="reset") Clear
            md-button.md-dense.md-accent(type="submit") Change
          md-card-header
            .md-title Change theme color
          md-card-content
            md-switch(v-model="theme", name="theme", id="theme") Light/Dark
</template>

<script>
  import store from '../vuex/store'

  export default {
    data () {
      return {
        outdated: '',
        updated: '',
        repeat: '',
        theme: true
      }
    },
    mounted () {
      store.commit('title', 'title.profile')
    },
    methods: {
      confirm () {
        this.$refs['confirm'].open()
      },
      close () {
        this.$refs['confirm'].close()
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
        return this.updated === this.repeat
      }
    },
    watch: {
      theme (boolean) {
        boolean ? this.$material.setCurrentTheme('dark') : this.$material.setCurrentTheme('light')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .md-card
    .md-card-header
      .md-title
        text-align left !important
</style>
