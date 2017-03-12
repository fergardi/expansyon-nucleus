<template lang="pug">
  md-layout.login.padding

    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-small="100", md-flex-xsmall="100")
      md-tabs(md-fixed)

        md-tab.no-padding#login(md-label="Login")
          form(v-on:submit.prevent="login()")
            md-card.md-primary.card.no-padding
              md-card-content.background
                md-input-container
                  label Email
                  md-input(type="email", v-model="credentials.email", required)
                md-input-container
                  label Password
                  md-input(type="password", v-model="credentials.password", required)
              md-card-content.center
                md-button.md-raised.md-fab.md-mini.md-warn(type="reset", v-bind:disabled="logging")
                  md-icon close
                md-button.md-raised.md-fab.md-mini.md-accent(type="submit", v-bind:disabled="logging")
                  md-icon(v-if="!logging") done
                  md-icon.spin(v-else) autorenew

        md-tab.no-padding#register(md-label="Register")
          form(v-on:submit.prevent="register()")
            md-card.md-primary.card.no-padding
              md-card-content.background
                md-input-container
                  label Email
                  md-input(type="mail", v-model="information.email", required)
                md-input-container
                  label Password
                  md-input(type="password", v-model="information.password", required)
                md-input-container
                  label Name
                  md-input(type="text", v-model="information.username", required)
              md-card-content.center
                md-button.md-raised.md-fab.md-mini.md-warn(type="reset", v-bind:disabled="registering")
                  md-icon clear
                md-button.md-raised.md-fab.md-mini.md-accent(type="submit", v-bind:disabled="registering")
                  md-icon(v-if="!registering") done
                  md-icon.spin(v-else) autorenew
</template>

<script>
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
          username: 'fergardi',
          email: 'test@test.com',
          password: 'test'
        },
        logging: false,
        registering: false
      }
    },
    mounted () {
      vuex.state.name = 'Expansyon'
      vuex.state.fullscreen = true
    },
    methods: {
      login () {
        this.logging = true
        auth.login(this.credentials)
        .then((response) => {
          this.logging = false
          if (auth.logged) this.$router.push('/status')
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