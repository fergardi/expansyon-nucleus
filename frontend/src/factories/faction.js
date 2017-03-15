var images = [
  'https://image.flaticon.com/icons/svg/270/270136.svg',
  'https://image.flaticon.com/icons/svg/270/270165.svg',
  'https://image.flaticon.com/icons/svg/270/270164.svg',
  'https://image.flaticon.com/icons/svg/270/270102.svg',
  'https://image.flaticon.com/icons/svg/270/270167.svg',
  'https://image.flaticon.com/icons/svg/270/270135.svg'
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
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  class () {
    return classes[Math.floor(Math.random() * classes.length)]
  },
  number () {
    return 0 + Math.floor(Math.random() * 100) // [0, 100)
  },
  build () {
    var faction = {
      image: factory.image(),
      name: 'Faction',
      metal: factory.number(),
      crystal: factory.number(),
      oil: factory.number(),
      size: factory.number(),
      energy: factory.number(),
      influence: factory.number(),
      attack: factory.number(),
      defense: factory.number(),
      speed: factory.number(),
      description: 'Description',
      class: factory.class()
    }
    return faction
  }
}

export default factory
