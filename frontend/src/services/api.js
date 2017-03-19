import constants from '../config/constants'
import axios from 'axios'

const url = constants.api

const api = {
  getFactions: () => {
    return axios.get(`${url}/faction`)
    .then((response) => {
      return response.data
    })
  },
  getPlanets: (id) => {
    return axios.get(`${url}/planet/${id}`)
    .then((response) => {
      return response.data
    })
  },
  getShips: () => {
    return axios.get(`${url}/ship`)
    .then((response) => {
      return response.data
    })
  },
  getBuildings: () => {
    return axios.get(`${url}/building`)
    .then((response) => {
      return response.data
    })
  },
  getTowers: () => {
    return axios.get(`${url}/tower`)
    .then((response) => {
      return response.data
    })
  },
  getRelics: () => {
    return axios.get(`${url}/relic`)
    .then((response) => {
      return response.data
    })
  },
  getReferendums: () => {
    return axios.get(`${url}/referendum`)
    .then((response) => {
      return response.data
    })
  },
  getMissions: () => {
    return axios.get(`${url}/mission`)
    .then((response) => {
      return response.data
    })
  },
  getSales: () => {
    return axios.get(`${url}/sale`)
    .then((response) => {
      return response.data
    })
  },
  getGuilds: () => {
    return axios.get(`${url}/guild`)
    .then((response) => {
      return response.data
    })
  },
  getTree: () => {
    return axios.get(`${url}/skill/tree`)
    .then((response) => {
      return response.data
    })
  },
  getPlayers: () => {
    return axios.get(`${url}/player`)
    .then((response) => {
      return response.data
    })
  },
  getPlayer: (id) => {
    return axios.get(`${url}/player/${id}`)
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
    return axios.get(`${url}/player/${player}/relic/${relic}`)
    .then((response) => {
      return response.data
    })
  }
}

export default api
