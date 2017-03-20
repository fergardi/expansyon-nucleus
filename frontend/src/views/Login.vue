<template lang="pug">
  md-layout.login.padding

    md-layout(md-flex-xlarge="100", md-flex-large="100", md-flex-medium="100", md-flex-small="100", md-flex-xsmall="100")
      md-tabs(md-fixed)

        md-tab.no-padding#login(md-label="Login")
          form(v-on:submit.stop.prevent="login()")
            md-card.md-primary.card.no-padding
              md-card-content
                md-input-container
                  md-icon mail
                  label Email
                  md-input(type="email", v-model="credentials.email", required)
                md-input-container(md-has-password)
                  md-icon lock
                  label Password
                  md-input(type="password", v-model="credentials.password", required)
              md-card-actions
                md-button.md-dense.md-warn(v-bind:disabled="logging") Forgot
                md-button.md-dense.md-accent(type="submit", v-bind:disabled="logging") Connect

        md-tab.no-padding#register(md-label="Register")
          form(v-on:submit.stop.prevent="register()")
            md-card.md-primary.card.no-padding
              md-card-content
                md-input-container(v-bind:class="{ 'md-input-invalid' : email }")
                  md-icon mail
                  label Email
                  md-input(type="email", v-model.lazy="information.email", required)
                  span.md-error Email already in use
                md-input-container(md-has-password, v-bind:class="{ 'md-input-invalid' : !secure }")
                  md-icon lock_outline
                  label Password
                  md-input(type="password", v-model="information.password", required)
                  span.md-error Password insecure
                md-input-container(md-has-password, v-bind:class="{ 'md-input-invalid' : !match }")
                  md-icon lock
                  label Repeat password
                  md-input(type="password", v-model="information.repeat", required)
                  span.md-error Passwords must match
                md-input-container(v-bind:class="{ 'md-input-invalid' : name }")
                  md-icon person
                  label Name
                  md-input(type="text", v-model="information.name", required)
                  span.md-error Name already in use
              md-card-actions
                md-button.md-dense.md-warn(type="reset", v-bind:class="{ hidden: registering }") Clear
                md-button.md-dense.md-accent(type="submit", v-bind:disabled="registering || email || name || !match || !secure") Register
</template>

<script>
  import api from '../services/api'
  import auth from '../services/auth'
  import store from '../vuex/store'

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
        email: false,
        name: false,
        logging: false,
        registering: false
      }
    },
    mounted () {
      store.commit('title', 'Expansyon')
      store.commit('enablefullscreen')
    },
    methods: {
      login () {
        this.logging = true
        auth.login(this.credentials)
        .then((response) => {
          if (store.state.account.logged) {
            api.getPlayer(store.state.account.id)
            .then((player) => {
              this.logging = false
              store.commit('player', player)
              this.$router.push('/planetarium') // TODO development route
            })
          }
        })
      },
      register () {
        if (!this.email && !this.name && this.match && this.secure) {
          this.registering = true
          auth.register(this.information)
          .then((response) => {
            this.registering = false
          })
        }
      }
    },
    watch: {
      'information.email': function (email) {
        api.checkEmail(email)
        .then((response) => {
          this.email = false
        })
        .catch((response) => {
          this.email = true
        })
      },
      'information.name': function (name) {
        api.checkName(name)
        .then((response) => {
          this.name = false
        })
        .catch((response) => {
          this.name = true
        })
      }
    },
    computed: {
      match () {
        return this.information.password === this.information.repeat
      },
      secure () {
        return true
      }
    },
    destroyed () {
      store.commit('disablefullscreen')
    }
  }
</script>

<style lang="stylus" scoped>
  // remove autofill color
  @-webkit-keyframes autofill {
    to {
      color white
      background transparent
    }
  }
  input:-webkit-autofill {
    -webkit-animation-name autofill
    -webkit-animation-fill-mode both
  }
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