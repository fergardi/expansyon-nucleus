var images = [
  'https://image.flaticon.com/icons/svg/270/270127.svg',
  'https://image.flaticon.com/icons/svg/270/270140.svg',
  'https://image.flaticon.com/icons/svg/270/270118.svg',
  'https://image.flaticon.com/icons/svg/270/270106.svg',
  'https://image.flaticon.com/icons/svg/270/270105.svg',
  'https://image.flaticon.com/icons/svg/270/270107.svg'
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
  number () {
    return 10 + Math.floor(Math.random() * 70) // [10, 70)
  },
  build () {
    var sale = {
      image: factory.image(),
      attack: factory.number(),
      defense: factory.number(),
      speed: factory.number(),
      name: 'SHIP',
      class: factory.class()
    }
    return sale
  }
}

export default factory
