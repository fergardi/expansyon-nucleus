var images = [
  'https://image.flaticon.com/icons/svg/270/270136.svg'
]

var classes = [
  'red',
  'green',
  'blue',
  'purple',
  'grey',
  'pink'
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
