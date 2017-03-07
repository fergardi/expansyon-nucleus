var images = [
  'https://image.flaticon.com/icons/svg/232/232481.svg',
  'https://image.flaticon.com/icons/svg/129/129522.svg',
  'https://image.flaticon.com/icons/svg/224/224474.svg'
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
      name: 'BUILDING',
      class: factory.class()
    }
    return sale
  }
}

export default factory
