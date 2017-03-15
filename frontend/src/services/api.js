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
  getArtifacts: () => {
    return axios.get(`${url}/artifact`)
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
    return axios.post(`${url}/user/email`, { email: email })
    .then((response) => {
      return response
    })
  }
}

export default api