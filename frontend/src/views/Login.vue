<template lang="pug">
  md-layout.login.padding

    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-tabs(md-fixed)

        md-tab.no-padding#login(md-label="Login")
          form(v-on:submit.prevent="login()")
            md-card.md-primary.card.no-padding
              md-card-content
                md-input-container
                  label Email
                  md-input(type="email", v-model="credentials.email", required)
                md-input-container(md-has-password)
                  label Password
                  md-input(type="password", v-model="credentials.password", required)
                .center
                  md-button.md-raised.md-fab.md-mini.md-warn(type="reset", v-bind:disabled="logging")
                    md-icon close
                  md-button.md-raised.md-fab.md-mini.md-accent(type="submit", v-bind:disabled="logging")
                    md-icon(v-if="!logging") done
                    md-icon.spin(v-else) autorenew

        md-tab.no-padding#register(md-label="Register")
          form(v-on:submit.prevent="register()")
            md-card.md-primary.card.no-padding
              md-card-content
                md-input-container(v-bind:class="{ 'md-input-invalid' : found }")
                  label Email
                  md-input(type="email", v-model.lazy="information.email", required)
                  span.md-error Email already in use
                md-input-container(md-has-password)
                  label Password
                  md-input(type="password", v-model="information.password", required)
                md-input-container(md-has-password, v-bind:class="{ 'md-input-invalid' : !match }")
                  label Repeat password
                  md-input(type="password", v-model="information.repeat", required)
                  span.md-error Passwords must match
                md-input-container
                  label Name
                  md-input(type="text", v-model="information.name", required)
                .center
                  md-button.md-raised.md-fab.md-mini.md-warn(type="reset", v-bind:disabled="registering")
                    md-icon clear
                  md-button.md-raised.md-fab.md-mini.md-accent(type="submit", v-bind:disabled="registering || found")
                    md-icon(v-if="!registering") done
                    md-icon.spin(v-else) autorenew
</template>

<script>
  import api from '../services/api'
  import auth from '../services/auth'
  import vuex from '../vuex/vuex'

  export default {
    data () {
      return {
        credentials: {
          email: 'test@test.com',
          password: 'test'
        },
        information: {
          email: '',
          password: '',
          repeat: '',
          name: ''
        },
        logging: false,
        registering: false,
        found: false
      }
    },
    mounted () {
      vuex.state.title = 'Expansyon'
      vuex.state.fullscreen = true
    },
    methods: {
      login () {
        this.logging = true
        auth.login(this.credentials)
        .then((response) => {
          this.logging = false
          if (vuex.state.player.logged) this.$router.push('/market') // TODO development route
        })
      },
      register () {
        this.registering = true
        auth.register(this.information)
        .then((response) => {
          this.registering = false
        })
      }
    },
    watch: {
      'information.email': function (email) {
        api.checkEmail(email)
        .then((response) => {
          this.found = false
        })
        .catch((response) => {
          this.found = true
        })
      }
    },
    computed: {
      match () {
        return this.information.password === this.information.repeat
      }
    },
    destroyed () {
      vuex.state.fullscreen = false
    }
  }
</script>

<style lang="stylus" scoped>
  .login
    display flex
    align-items center
    justify-content center
  .spin
    animation spin 1s infinite linear
  @keyframes spin
    from 
      transform:rotate(0deg)
    to 
      transform:rotate(360deg)
</style>