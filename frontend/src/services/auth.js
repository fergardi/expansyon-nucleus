import constants from '../config/constants'
import axios from 'axios'
import vuex from '../vuex/vuex'

const url = constants.api

const auth = {
  login: (credentials) => {
    return axios.post(`${url}/player/login`, credentials)
    .then((response) => {
      if (response.status === 200) {
        vuex.state.player.logged = true
        vuex.state.player.token = response.data.token
        vuex.state.player.id = response.data.id
      }
      return response
    })
  },
  logout: () => {
    vuex.state.player.logged = false
    vuex.state.player.token = null
    vuex.state.player.id = 0
  },
  register: (information) => {
    return axios.post(`${url}/player/register`, information)
    .then((response) => {
      return response
    })
  }
}

export default auth
