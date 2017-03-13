<template lang="pug">
  md-layout
    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-small="100", md-flex-xsmall="100")

      md-card.md-primary.card
        md-card-header
          .md-title Change password
        md-card-content.center
          form(v-on:submit.prevent="change()")
            md-input-container
              label Old password
              md-input(type="password", v-model="outdated", required)
            md-input-container
              label New password
              md-input(type="password", v-model="updated", required)
            md-button.md-raised.md-fab.md-mini.md-warn(type="reset")
              md-icon close
            md-button.md-raised.md-fab.md-mini.md-accent(type="submit")
              md-icon done
        md-card-header
          .md-title Change theme color
        md-card-content.center
          md-switch(v-model="theme", name="theme", id="theme") Light/Dark
</template>

<script>
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        outdated: '',
        updated: '',
        theme: true
      }
    },
    mounted () {
      vuex.state.name = 'Profile'
    },
    methods: {
      change () {
        console.log(this.outdated, this.updated)
      }
    },
    computed: {
      search () {
        return vuex.state.search
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
