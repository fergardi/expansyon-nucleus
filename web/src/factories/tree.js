var images = [
  'https://image.flaticon.com/icons/svg/270/270136.svg',
  'https://image.flaticon.com/icons/svg/178/178158.svg',
  'https://image.flaticon.com/icons/svg/201/201883.svg'
]

var classes = [
  'red',
  'green',
  'blue'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  class () {
    return classes[Math.floor(Math.random() * classes.length)]
  },
  skill (quantity) {
    var skills = []
    for (var i = 0; i < quantity; i++) {
      skills.push({
        image: factory.image(),
        name: 'NAME',
        level: 0
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
