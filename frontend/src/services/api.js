import axios from 'axios'

// baseUrl, timeout and authorization bearer have been defined in ../services/auth

const api = {
  getFactions: () => {
    return axios.get(`/faction`)
    .then((response) => {
      return response.data
    })
  },
  getPlanets: (id) => {
    return axios.get(`/planet/${id}`)
    .then((response) => {
      return response.data
    })
  },
  getShips: () => {
    return axios.get(`/ship`)
    .then((response) => {
      return response.data
    })
  },
  getBuildings: () => {
    return axios.get(`/building`)
    .then((response) => {
      return response.data
    })
  },
  getTowers: () => {
    return axios.get(`/tower`)
    .then((response) => {
      return response.data
    })
  },
  getRelics: () => {
    return axios.get(`/relic`)
    .then((response) => {
      return response.data
    })
  },
  getReferendums: () => {
    return axios.get(`/referendum`)
    .then((response) => {
      return response.data
    })
  },
  getMissions: () => {
    return axios.get(`/mission`)
    .then((response) => {
      return response.data
    })
  },
  getStore: () => {
    return axios.get(`/relic/store`)
    .then((response) => {
      return response.data
    })
  },
  getSales: () => {
    return axios.get(`/sale`)
    .then((response) => {
      return response.data
    })
  },
  getGuilds: () => {
    return axios.get(`/guild`)
    .then((response) => {
      return response.data
    })
  },
  getTree: () => {
    return axios.get(`/skill/tree`)
    .then((response) => {
      return response.data
    })
  },
  getPlayers: () => {
    return axios.get(`/player`)
    .then((response) => {
      return response.data
    })
  },
  getPlayer: (id) => {
    return axios.get(`/player/${id}`)
    .then((response) => {
      return response.data
    })
  },
  getBattles: () => {
    return axios.get(`/battle`)
    .then((response) => {
      return response.data
    })
  },
  checkEmail: (email) => {
    return axios.post(`/player/email`, { email: email })
    .then((response) => {
      return response
    })
  },
  checkName: (name) => {
    return axios.post(`/player/name`, { name: name })
    .then((response) => {
      return response
    })
  },
  buyMarket: (player, sale) => {
    return axios.post(`/player/${player}/market/${sale}`)
    .then((response) => {
      return response
    })
  },
  regretMarket: (player, sale) => {
    return axios.put(`/player/${player}/regret/${sale}`)
    .then((response) => {
      return response
    })
  },
  buyStore: (player, relic) => {
    return axios.post(`/player/${player}/store/${relic}`)
    .then((response) => {
      return response
    })
  },
  activateRelic: (player, relic) => {
    return axios.post(`/player/${player}/relic/${relic}`)
    .then((response) => {
      return response
    })
  },
  joinFaction: (player, faction) => {
    return axios.put(`/player/${player}/faction/${faction}`)
    .then((response) => {
      return response
    })
  },
  voteReferendum: (player, referendum) => {
    return axios.put(`/player/${player}/referendum/${referendum}`)
    .then((response) => {
      return response
    })
  },
  buildShip: (player, ship, quantity) => {
    return axios.put(`/player/${player}/ship/${ship}/quantity/${quantity}`)
    .then((response) => {
      return response
    })
  },
  buildBuilding: (player, building, quantity) => {
    return axios.put(`/player/${player}/building/${building}/quantity/${quantity}`)
    .then((response) => {
      return response
    })
  },
  buildTower: (player, tower, quantity) => {
    return axios.put(`/player/${player}/tower/${tower}/quantity/${quantity}`)
    .then((response) => {
      return response
    })
  },
  sendMessage: (player, message) => {
    return axios.post(`/player/${player}/message`, message)
    .then((response) => {
      return response
    })
  },
  removeMessage: (player, message) => {
    return axios.delete(`/player/${player}/message/${message}/remove`)
    .then((response) => {
      return response
    })
  },
  sellShip: (player, sale) => {
    return axios.post(`/player/${player}/sale/ship`, sale)
    .then((response) => {
      return response
    })
  },
  sellRelic: (player, sale) => {
    return axios.post(`/player/${player}/sale/relic`, sale)
    .then((response) => {
      return response
    })
  },
  sellPlanet: (player, sale) => {
    return axios.post(`/player/${player}/sale/planet`, sale)
    .then((response) => {
      return response
    })
  },
  saveTree: (player, tree) => {
    return axios.put(`/player/${player}/tree`, { tree: tree })
    .then((response) => {
      return response
    })
  }
}

export default api
