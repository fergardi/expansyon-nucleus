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
  }
})

export default vuex
