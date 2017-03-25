var models = require('../models')
var express = require('express')
var router = express.Router()

var socketio = require('../services/socketio').io()
var security = require('../services/security')
var jwt = require('../services/jwt')
var cron = require('../services/cron')
var factory = require('../factories/planet')

// add resources
cron.schedule('0 * * * * *', () => {
  models.Player.findAll()
  .then((players) => {
    players.forEach((player) => {
      player.turns++
      player.save()
    })
    socketio.emit('player')
  })
})

// GET /api/player
router.get('/:id', security.secured, (req, res) => {
  models.Player.findOne({
    where: { id: req.params.id },
    include: [
      { model: models.Guild },
      { model: models.Faction },
      { model: models.Planet, separate: true },
      { model: models.Relic },
      { model: models.Ship },
      { model: models.Building },
      { model: models.Tower },
      { model: models.Message, separate: true, as: 'Sent', include: { model: models.Player, as: 'To', attributes: ['name'], include: { model: models.Faction } } },
      { model: models.Message, separate: true, as: 'Received', include: { model: models.Player, as: 'From', attributes: ['name'], include: { model: models.Faction } } }
    ],
    attributes: { exclude: ['password', 'token'] }
  })
  .then((player) => {
    // extend object
    var info = player.toJSON()
    var planetIds = player.Planets.map((planet) => planet.id)
    // var salesIds = player.Sales.map((sale) => sale.id)
    // queries
    var queries = []
    // transmission
    queries.push(player.getReceived({ order: 'datetime DESC' }))
    // planetarium
    queries.push(player.getPlanets({ order: 'id ASC' }))
    // hangar
    queries.push(player.getShips({ order: 'id ASC' }))
    // infrastructure
    queries.push(player.getBuildings({ order: 'id ASC' }))
    // defense
    queries.push(player.getTowers({ order: 'id ASC' }))
    // relicarium
    queries.push(player.getRelics({ order: 'id ASC' }))
    // store
    queries.push(models.Relic.count({ where: { store: true } }))
    // market
    queries.push(models.Sale.count()) // TODO ignore own sales
    // senate
    queries.push(models.Referendum.count({ where: { visible: true } }))
    // cantina
    queries.push(models.Mission.count({ where: { visible: true } }))
    // exploration
    queries.push(models.Planet.count({ where: { $and: [ { id: { $notIn: planetIds } }, { visible: true } ] } }))
    Promise.all(queries)
    .then((results) => {
      // transmission
      info.transmission = results[0].length
      // planetarium
      info.planetarium = results[1].length
      info.size = results[1].reduce((total, planet) => total + planet.size, 0)
      info.energy = results[1].reduce((total, planet) => total + planet.energy, 0)
      info.influence = results[1].reduce((total, planet) => total + planet.influence, 0)
      // hangar
      info.fighter = results[2][0].PlayerShip.quantity
      info.cruiser = results[2][1].PlayerShip.quantity
      info.bomber = results[2][2].PlayerShip.quantity
      info.orbiter = results[2][3].PlayerShip.quantity
      info.carrier = results[2][4].PlayerShip.quantity
      info.recycler = results[2][5].PlayerShip.quantity
      // infrastructure
      info.furnace = results[3][0].PlayerBuilding.quantity
      info.factory = results[3][1].PlayerBuilding.quantity
      info.refinery = results[3][2].PlayerBuilding.quantity
      info.plant = results[3][3].PlayerBuilding.quantity
      info.barrier = results[3][4].PlayerBuilding.quantity
      info.warehouse = results[3][5].PlayerBuilding.quantity
      // defense
      info.turret = results[4][0].PlayerTower.quantity
      info.railgun = results[4][1].PlayerTower.quantity
      info.cannon = results[4][2].PlayerTower.quantity
      // relicarium
      info.relicarium = results[5].reduce((total, relic) => total + relic.PlayerRelic.quantity, 0)
      // store
      info.store = results[6]
      // market
      info.market = results[7]
      // senate
      info.senate = results[8]
      // cantina
      info.cantina = results[9]
      // exploration
      info.exploration = results[10]
      // return all info
      res.status(200).json(info)
    })
  })
})

// POST /api/player/login
router.post('/login', (req, res) => {
  models.Player.findOne({
    where: { email: req.body.email, password: req.body.password }
  })
  .then((player) => {
    if (player) {
      var token = jwt.token(player)
      res.status(200).json({ id: player.id, token: token })
    } else {
      res.status(401).end()
    }
  })
})

// POST /api/player/email
router.post('/email', (req, res) => {
  models.Player.findOne({
    where: { email: req.body.email }
  })
  .then((player) => {
    if (player) {
      res.status(303).end()
    } else {
      res.status(200).end()
    }
  })
})

// POST /api/player/name
router.post('/name', (req, res) => {
  models.Player.findOne({
    where: { name: req.body.name }
  })
  .then((player) => {
    if (player) {
      res.status(303).end()
    } else {
      res.status(200).end()
    }
  })
})

// GET /api/player
router.get('/', security.secured, (req, res) => {
  models.Player.findAll({
    include: { model: models.Planet, separate: true },
    attributes: { exclude: ['email', 'password'] }
  })
  .then((players) => {
    var info = []
    players.forEach((player) => {
      player = player.toJSON()
      player.influence = player.Planets.reduce((total, planet) => total + planet.influence, 0)
      info.push(player)
    })
    res.status(200).json(info)
  })
})

// GET /api/player/playerId/relic/relicId
router.get('/:playerId/relic/:relicId', security.secured, (req, res) => {
  models.Player.findOne({
    where: { id: req.params.playerId }
  })
  .then((player) => {
    player.getRelics({
      where: { id: req.params.relicId }
    })
    .then((relics) => {
      if (relics.length > 0) {
        var relic = relics[0]
        if (relic.PlayerRelic.quantity <= 1) {
          player.removeRelic(relic)
        } else {
          relic.PlayerRelic.quantity--
          relic.PlayerRelic.save()
        }
        // create new planet
        if (relic.planet) {
          models.Planet.create(factory.build())
          .then((planet) => {
            player.addPlanet(planet)
            .then((player) => {
              res.status(200).json(planet)
              socketio.emit('player')
            })
          })
        }
        // create new moon
        if (relic.moon) {
          player.getPlanets({
            where: { moon: false }
          })
          .then((planets) => {
            if (planets.length > 0) {
              var planet = planets[Math.floor(Math.random() * planets.length)]
              planet.moon = true
              planet.metal = Math.min(planet.metal + 10, 100)
              planet.crystal = Math.min(planet.crystal + 10, 100)
              planet.oil = Math.min(planet.metal + 10, 100)
              planet.size = Math.min(planet.size + 10, 100)
              planet.energy = Math.min(planet.energy + 10, 100)
              planet.influence = Math.min(planet.influence + 10, 100)
              planet.save()
              .then((planet) => {
                socketio.emit('player')
                res.status(200).json(planet)
              })
            }
          })
        }
        // create new station
        if (relic.station) {
          player.getPlanets({
            where: { station: false }
          })
          .then((planets) => {
            if (planets.length > 0) {
              var planet = planets[Math.floor(Math.random() * planets.length)]
              planet.station = true
              planet.metal = Math.min(planet.metal + 10, 100)
              planet.crystal = Math.min(planet.crystal + 10, 100)
              planet.oil = Math.min(planet.metal + 10, 100)
              planet.size = Math.min(planet.size + 10, 100)
              planet.energy = Math.min(planet.energy + 10, 100)
              planet.influence = Math.min(planet.influence + 10, 100)
              planet.save()
              .then((planet) => {
                socketio.emit('player')
                res.status(200).json(planet)
              })
            }
          })
        }
        // generate resources
        if (relic.turns > 0 || relic.metal > 0 || relic.crystal > 0 || relic.oil > 0) {
          player.turns += Math.floor(Math.random() * relic.turns)
          player.metal += Math.floor(Math.random() * relic.metal)
          player.crystal += Math.floor(Math.random() * relic.crystal)
          player.oil += Math.floor(Math.random() * relic.oil)
          player.save()
          .then((player) => {
            socketio.emit('player')
            res.status(200).json(player)
          })
        }
        // create new ships
        // TODO
        // fallback
      } else {
        res.status(400).end()
      }
    })
  })
})

module.exports = router
