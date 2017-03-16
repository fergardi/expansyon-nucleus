var images = [
  'https://image.flaticon.com/icons/svg/167/167347.svg',
  'https://image.flaticon.com/icons/svg/315/315312.svg',
  'https://image.flaticon.com/icons/svg/238/238634.svg',
  'https://image.flaticon.com/icons/svg/137/137046.svg'
]

var classes = [
  'red',
  'orange',
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
    var relic = {
      image: factory.image(),
      name: 'ITEM',
      description: 'Description',
      class: factory.class()
    }
    return relic
  }
}

export default factory
