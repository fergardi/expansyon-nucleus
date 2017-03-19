<template lang="pug">
  md-layout
    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card
        form(v-on:submit.stop.prevent="change()")
          md-card-header
            .md-title Change password
          md-card-content.center
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
            md-button.md-icon-button.md-warn(type="reset")
              md-icon clear
            md-button.md-icon-button.md-accent(type="submit")
              md-icon done
          md-card-header
            .md-title Change theme color
          md-card-content
            md-switch(v-model="theme", name="theme", id="theme") Light/Dark
</template>

<script>
  import vuex from '../vuex/vuex'

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
      vuex.commit('title', 'Profile')
    },
    methods: {
      change () {
        console.log(this.outdated, this.updated)
      }
    },
    computed: {
      search () {
        return vuex.state.search
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
