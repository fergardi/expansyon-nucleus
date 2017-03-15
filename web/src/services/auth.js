import constants from '../config/constants'
import axios from 'axios'
import vuex from '../vuex/vuex'

const url = constants.api

const auth = {
  login: (credentials) => {
    return axios.post(`${url}/user/login`, credentials)
    .then((response) => {
      if (response.status === 200) {
        vuex.state.user.logged = true
        vuex.state.user.token = response.data.token
        vuex.state.user.id = response.data.id
      }
      return response
    })
  },
  logout: () => {
    vuex.state.user.logged = false
    vuex.state.user.token = null
    vuex.state.user.id = 0
  },
  register: (information) => {
    return axios.post(`${url}/user/register`, information)
    .then((response) => {
      return response
    })
  }
}

export default auth
