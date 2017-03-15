var images = [
  'https://image.flaticon.com/icons/svg/270/270112.svg',
  'https://image.flaticon.com/icons/svg/270/270126.svg',
  'https://image.flaticon.com/icons/svg/270/270114.svg'
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
    var tower = {
      image: factory.image(),
      name: 'TOWER',
      description: 'Description',
      attack: factory.number(),
      defense: factory.number(),
      speed: factory.number(),
      class: factory.class()
    }
    return tower
  }
}

export default factory
