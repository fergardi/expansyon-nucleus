import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    fullscreen: false,
    name: '',
    search: '',
    image: 'https://image.flaticon.com/icons/svg/124/124558.svg'
  }
})

export default vuex
