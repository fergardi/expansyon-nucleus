import constants from '../config/constants'
import axios from 'axios'
import store from '../vuex/store'

axios.defaults.baseURL = constants.api

const auth = {
  login: (credentials) => {
    return axios.post(`/player/login`, credentials)
    .then((response) => {
      if (response.status === 200) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
        store.commit('login', response.data.id)
      }
      return response
    })
  },
  logout: () => {
    axios.defaults.headers.common['Authorization'] = ''
    store.commit('logout')
  },
  register: (information) => {
    return axios.post(`/player/register`, information)
    .then((response) => {
      return response
    })
  }
}

export default auth
