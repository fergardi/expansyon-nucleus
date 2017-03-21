import constants from '../config/constants'
import axios from 'axios'
import store from '../vuex/store'

const url = constants.api

const api = {
  getFactions: () => {
    return axios.get(`${url}/faction`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getPlanets: (id) => {
    return axios.get(`${url}/planet/${id}`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getShips: () => {
    return axios.get(`${url}/ship`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getBuildings: () => {
    return axios.get(`${url}/building`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getTowers: () => {
    return axios.get(`${url}/tower`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getRelics: () => {
    return axios.get(`${url}/relic`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getReferendums: () => {
    return axios.get(`${url}/referendum`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getMissions: () => {
    return axios.get(`${url}/mission`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getStore: () => {
    return axios.get(`${url}/relic/store`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getSales: () => {
    return axios.get(`${url}/sale`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getGuilds: () => {
    return axios.get(`${url}/guild`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getTree: () => {
    return axios.get(`${url}/skill/tree`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getPlayers: () => {
    return axios.get(`${url}/player`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  getPlayer: (id) => {
    return axios.get(`${url}/player/${id}`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response.data
    })
  },
  checkEmail: (email) => {
    return axios.post(`${url}/player/email`, { email: email })
    .then((response) => {
      return response
    })
  },
  checkName: (name) => {
    return axios.post(`${url}/player/name`, { name: name })
    .then((response) => {
      return response
    })
  },
  activateRelic: (player, relic) => {
    return axios.get(`${url}/player/${player}/relic/${relic}`, { headers: { 'Authorization': 'Bearer ' + store.state.account.token }})
    .then((response) => {
      return response
    })
  }
}

export default api
