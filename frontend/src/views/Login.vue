<template lang="pug">
  md-layout.login.padding

    md-layout(md-flex-xlarge="33", md-flex-large="50", md-flex-medium="66", md-flex-small="100", md-flex-xsmall="100")

      md-tabs(md-fixed)

        md-tab.no-padding#login(v-bind:md-label="$t('tab.login')")
          form(v-on:submit.stop.prevent="login()")
            md-card.md-primary.card.no-padding
              md-card-content
                md-input-container
                  md-icon mail
                  label {{ 'account.email' | i18n }}
                  md-input(type="email", v-model="credentials.email", required)
                md-input-container(md-has-password)
                  md-icon lock
                  label {{ 'account.password' | i18n }}
                  md-input(type="password", v-model="credentials.password", minlength="6", required)
              md-card-actions
                md-button.md-dense.md-warn(v-bind:disabled="logging") {{ 'button.forgot' | i18n }}
                md-button.md-dense.md-accent(type="submit", v-bind:disabled="logging") {{ 'button.accept' | i18n }}

        md-tab.no-padding#register(v-bind:md-label="$t('tab.register')")
          form(v-on:submit.stop.prevent="register()")
            md-card.md-primary.card.no-padding
              md-card-content
                md-input-container(v-bind:class="{ 'md-input-invalid' : email }")
                  md-icon mail
                  label {{ 'account.email' | i18n }}
                  md-input(type="email", v-model.lazy="information.email", required)
                  span.md-error {{ 'account.unique' | i18n }}
                md-input-container(md-has-password, v-bind:class="{ 'md-input-invalid' : !secure }")
                  md-icon lock_outline
                  label {{ 'account.password' | i18n }}
                  md-input(type="password", v-model="information.password", minlength="6", required)
                  span.md-error {{ 'account.weak' | i18n }}
                md-input-container(md-has-password, v-bind:class="{ 'md-input-invalid' : !match }")
                  md-icon lock
                  label {{ 'account.repeat' | i18n }}
                  md-input(type="password", v-model="information.repeat", minlength="6", required)
                  span.md-error {{ 'account.mismatch' | i18n }}
                md-input-container(v-bind:class="{ 'md-input-invalid' : name }")
                  md-icon person
                  label {{ 'account.name' | i18n }}
                  md-input(type="text", v-model="information.name", minlength="6", required)
                  span.md-error {{ 'account.repeated' | i18n }}
              md-card-actions
                md-button.md-dense.md-warn(type="reset", v-bind:class="{ hidden: registering }") {{ 'button.clear' | i18n }}
                md-button.md-dense.md-accent(type="submit", v-bind:disabled="registering || email || name || !match || !secure") {{ 'button.accept' | i18n }}
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
              store.commit('player', player)
              this.logging = false
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
      color yellow
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