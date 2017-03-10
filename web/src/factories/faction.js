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
  build () {
    var faction = {
      image: factory.image(),
      name: 'FACTION',
      description: 'Description',
      class: factory.class()
    }
    return faction
  }
}

export default factory
