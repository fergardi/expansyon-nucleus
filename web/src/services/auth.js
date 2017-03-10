import axios from 'axios'

// fake api
var url = 'https://reqres.in/api/login'

const auth = {
  logged: false,
  token: null,
  login: (credentials) => {
    return axios.post(url, credentials)
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
    return axios.post(url, information)
    .then((response) => {
      return response
    })
  }
}

export default auth
