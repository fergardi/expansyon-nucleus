import constants from '../config/constants'
import axios from 'axios'
import vuex from '../vuex/vuex'

const url = constants.api

const auth = {
  login: (credentials) => {
    return axios.post(`${url}/player/login`, credentials)
    .then((response) => {
      if (response.status === 200) {
        vuex.commit('login', { token: response.data.token, id: response.data.id })
      }
      return response
    })
  },
  logout: () => {
    vuex.commit('logout')
  },
  register: (information) => {
    return axios.post(`${url}/player/register`, information)
    .then((response) => {
      return response
    })
  }
}

export default auth
