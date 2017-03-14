import constants from '../config/constants'
import axios from 'axios'

const url = constants.api

const auth = {
  logged: false,
  token: null,
  login: (credentials) => {
    return axios.post(`${url}/user/login`, credentials)
    .then((response) => {
      if (response.status === 200) {
        auth.logged = true
        auth.token = response.data.token
      }
      return response
    })
  },
  logout: () => {
    auth.logged = false
    auth.token = null
  },
  register: (information) => {
    return axios.post(`${url}/user/register`, information)
    .then((response) => {
      return response
    })
  }
}

export default auth
