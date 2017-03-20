import constants from '../config/constants'
import axios from 'axios'
import store from '../vuex/store'

const url = constants.api

const auth = {
  login: (credentials) => {
    return axios.post(`${url}/player/login`, credentials)
    .then((response) => {
      if (response.status === 200) {
        store.commit('login', { token: response.data.token, id: response.data.id })
      }
      return response
    })
  },
  logout: () => {
    store.commit('logout')
  },
  register: (information) => {
    return axios.post(`${url}/player/register`, information)
    .then((response) => {
      return response
    })
  }
}

export default auth
