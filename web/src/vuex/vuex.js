import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    fullscreen: false,
    name: 'Expansyon'
  }
})

export default vuex
