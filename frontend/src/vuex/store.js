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
      state.title = string
    },
    search (state, string) {
      state.search = string
    },
    clear (state) {
      state.search = ''
    },
    login (state, id) {
      state.account.logged = true
      state.account.id = id
    },
    logout (state) {
      state.account.logged = false
      state.account.id = 0
    },
    player (state, player) {
      state.player = player
    }
  }
})

export default store
