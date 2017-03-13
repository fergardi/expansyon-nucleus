var factions = [
  'SEDI',
  'JITH'
]

var classes = [
  'red',
  'green',
  'indigo',
  'purple',
  'yellow',
  'cyan'
]

const factory = {
  name () {
    return 'Name'
  },
  class () {
    return classes[Math.floor(Math.random() * classes.length)]
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
      class: factory.class(),
      faction: factory.faction(),
      planets: factory.number(),
      fleet: factory.number(),
      influence: factory.number()
    }
    return player
  }
}

export default factory
