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
  getPlanets: () => {
    return axios.get(`${url}/planet`)
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
  getUsers: () => {
    return axios.get(`${url}/user`)
    .then((response) => {
      return response.data
    })
  }
}

export default api
