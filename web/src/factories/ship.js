var images = [
  'https://image.flaticon.com/icons/svg/270/270109.svg',
  'https://image.flaticon.com/icons/svg/270/270140.svg',
  'https://image.flaticon.com/icons/svg/270/270118.svg',
  'https://image.flaticon.com/icons/svg/270/270106.svg',
  'https://image.flaticon.com/icons/svg/270/270105.svg',
  'https://image.flaticon.com/icons/svg/270/270108.svg'
]

var classes = [
  'grey'
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
    var ship = {
      image: factory.image(),
      attack: factory.number(),
      defense: factory.number(),
      speed: factory.number(),
      name: 'SHIP',
      description: 'Description',
      class: factory.class()
    }
    return ship
  }
}

export default factory
