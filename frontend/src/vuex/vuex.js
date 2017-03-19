import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    fullscreen: false,
    title: '',
    search: '',
    player: {
      logged: false,
      token: null,
      id: 0
    }
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
      state.player.logged = true
      state.player.token = info.token
      state.player.id = info.id
    },
    logout (state) {
      state.player.logged = false
      state.player.token = null
      state.player.id = 0
    }
  }
})

export default vuex
