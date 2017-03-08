var factions = [
  'SEDI',
  'JITH'
]

const factory = {
  name () {
    return 'Name'
  },
  faction () {
    return factions[Math.floor(Math.random() * factions.length)]
  },
  number () {
    return 0 + Math.floor(Math.random() * 200) // [0, 200)
  },
  build () {
    var player = {
      name: factory.name(),
      faction: factory.faction(),
      planets: factory.number(),
      fleet: factory.number(),
      influence: factory.number()
    }
    return player
  }
}

export default factory
