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
      name: 'MISSION',
      class: factory.class()
    }
    return sale
  }
}

export default factory
