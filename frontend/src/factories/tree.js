var images = [
  'https://image.flaticon.com/icons/svg/270/270109.svg',
  'https://image.flaticon.com/icons/svg/270/270140.svg',
  'https://image.flaticon.com/icons/svg/270/270118.svg',
  'https://image.flaticon.com/icons/svg/270/270106.svg',
  'https://image.flaticon.com/icons/svg/270/270105.svg',
  'https://image.flaticon.com/icons/svg/270/270108.svg',
  'https://image.flaticon.com/icons/svg/270/270126.svg',
  'https://image.flaticon.com/icons/svg/270/270141.svg',
  'https://image.flaticon.com/icons/svg/270/270162.svg',
  'https://image.flaticon.com/icons/svg/270/270157.svg'
]

var classes = [
  'red',
  'green',
  'yellow'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  class () {
    return classes[Math.floor(Math.random() * classes.length)]
  },
  number () {
    return 0 + Math.floor(Math.random() * 10) // [0, 10)
  },
  skill (quantity) {
    var skills = []
    for (var i = 0; i < quantity; i++) {
      skills.push({
        image: factory.image(),
        name: 'NAME',
        level: factory.number(),
        min: 0,
        max: 10
      })
    }
    return skills
  },
  build () {
    var tree = {
      name: 'TREE',
      skills: factory.skill(10),
      description: 'Description',
      class: factory.class()
    }
    return tree
  }
}

export default factory
