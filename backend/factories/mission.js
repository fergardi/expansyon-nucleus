const images = [
  'https://image.flaticon.com/icons/svg/139/139692.svg'
]

const names = [
  'Mission'
]

const classes = [
  'red',
  'green',
  'yellow'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  name () {
    return names[Math.floor(Math.random() * names.length)]
  },
  number () {
    return 0 + Math.floor(Math.random() * 100) // [0, 100)
  },
  class () {
    return classes[Math.floor(Math.random() * classes.length)]
  },
  build (sequelize) {
    var mission = {
      image: factory.image(),
      name: factory.name(),
      description: 'Description',
      class: factory.class(),
      attack: factory.number(),
      defense: factory.number(),
      speed: factory.number()
    }
    if (sequelize) {
      mission = { model: 'Mission', data: mission }
    }
    return mission
  },
  bulk (quantity, sequelize) {
    var missions = []
    for (var i = 0; i < quantity; i++) {
      missions.push(factory.build(sequelize))
    }
    return missions
  }
}

module.exports = factory
