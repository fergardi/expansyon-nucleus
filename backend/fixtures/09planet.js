'use strict'

const factory = require('../factories/planet')
const fixtures = require('../config/fixtures')

module.exports = factory.bulk(fixtures.players, true, true)
                 .concat(factory.bulk(fixtures.planets, false, true))
