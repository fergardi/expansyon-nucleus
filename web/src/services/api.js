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
  }
}

export default api
