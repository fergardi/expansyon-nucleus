import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    fullscreen: false,
    title: '',
    search: '',
    account: {
      logged: false,
      token: null,
      id: 0
    },
    player: {}
  },
  mutations: {
    enablefullscreen (state) {
      state.fullscreen = true
    },
    disablefullscreen (state) {
      state.fullscreen = false
    },
    title (state, string) {
      state.title = string || 'Expansyon'
    },
    search (state, string) {
      state.search = string || ''
    },
    clear (state) {
      state.search = ''
    },
    login (state, info) {
      state.account.logged = true
      state.account.token = info.token
      state.account.id = info.id
    },
    logout (state) {
      state.account.logged = false
      state.account.token = null
      state.account.id = 0
    },
    player (state, player) {
      state.player = player
    }
  }
})

export default store
