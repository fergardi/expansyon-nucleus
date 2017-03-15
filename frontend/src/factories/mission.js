var images = [
  'https://image.flaticon.com/icons/svg/270/270136.svg',
  'https://image.flaticon.com/icons/svg/270/270138.svg',
  'https://image.flaticon.com/icons/svg/270/270143.svg',
  'https://image.flaticon.com/icons/svg/179/179527.svg',
  'https://image.flaticon.com/icons/svg/270/270099.svg',
  'https://image.flaticon.com/icons/svg/270/270095.svg',
  'https://image.flaticon.com/icons/svg/270/270145.svg',
  'https://image.flaticon.com/icons/svg/270/270103.svg',
  'https://image.flaticon.com/icons/svg/270/270098.svg',
  'https://image.flaticon.com/icons/svg/270/270100.svg',
  'https://image.flaticon.com/icons/svg/270/270141.svg',
  'https://image.flaticon.com/icons/svg/270/270101.svg',
  'https://image.flaticon.com/icons/svg/270/270097.svg',
  'https://image.flaticon.com/icons/svg/270/270096.svg',
  'https://image.flaticon.com/icons/svg/270/270134.svg',
  'https://image.flaticon.com/icons/svg/270/270094.svg',
  'https://image.flaticon.com/icons/svg/139/139686.svg'
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
  number () {
    return 0 + Math.floor(Math.random() * 100) // [0, 100)
  },
  build () {
    var mission = {
      image: factory.image(),
      name: 'MISSION',
      description: 'Description',
      attack: factory.number(),
      defense: factory.number(),
      speed: factory.number(),
      class: factory.class()
    }
    return mission
  }
}

export default factory
