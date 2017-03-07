var images = [
  'https://image.flaticon.com/icons/svg/270/270112.svg',
  'https://image.flaticon.com/icons/svg/270/270126.svg',
  'https://image.flaticon.com/icons/svg/270/270114.svg'
]

var classes = [
  'red',
  'orange',
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
    var sale = {
      image: factory.image(),
      name: 'TOWER',
      class: factory.class()
    }
    return sale
  }
}

export default factory
