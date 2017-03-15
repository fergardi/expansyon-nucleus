var images = [
  'https://image.flaticon.com/icons/svg/270/270136.svg'
]

var classes = [
  'red',
  'green'
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
    var law = {
      image: factory.image(),
      name: 'Referendum',
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
    return law
  }
}

export default factory
