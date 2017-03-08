var images = [
  'https://image.flaticon.com/icons/svg/232/232481.svg',
  'https://image.flaticon.com/icons/svg/129/129522.svg',
  'https://image.flaticon.com/icons/svg/224/224474.svg'
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
    var building = {
      image: factory.image(),
      name: 'BUILDING',
      building: 'Description',
      metal: factory.number(),
      crystal: factory.number(),
      oil: factory.number(),
      class: factory.class()
    }
    return building
  }
}

export default factory
