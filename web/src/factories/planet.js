var images = [
  'https://image.flaticon.com/icons/svg/124/124558.svg',
  'https://image.flaticon.com/icons/svg/124/124582.svg',
  'https://image.flaticon.com/icons/svg/139/139706.svg',
  'https://image.flaticon.com/icons/svg/139/139706.svg',
  'https://image.flaticon.com/icons/svg/124/124581.svg',
  'https://image.flaticon.com/icons/svg/139/139727.svg',
  'https://image.flaticon.com/icons/svg/207/207532.svg',
  'https://image.flaticon.com/icons/svg/308/308748.svg',
  'https://image.flaticon.com/icons/svg/124/124555.svg',
  'https://image.flaticon.com/icons/svg/139/139682.svg',
  'https://image.flaticon.com/icons/svg/139/139725.svg',
  'https://image.flaticon.com/icons/svg/139/139730.svg',
  'https://image.flaticon.com/icons/svg/139/139728.svg',
  'https://image.flaticon.com/icons/svg/231/231105.svg',
  'https://image.flaticon.com/icons/svg/327/327483.svg',
  'https://image.flaticon.com/icons/svg/305/305895.svg',
  'https://image.flaticon.com/icons/svg/310/310121.svg',
  'https://image.flaticon.com/icons/svg/234/234298.svg',
  'https://image.flaticon.com/icons/svg/139/139693.svg',
  'https://image.flaticon.com/icons/svg/139/139705.svg',
  'https://image.flaticon.com/icons/svg/139/139707.svg',
  'https://image.flaticon.com/icons/svg/270/270146.svg'
]

const factory = {
  image () {
    return images[Math.floor(Math.random() * images.length)]
  },
  type (planet) {
    if (factory.total(planet) > 400) {
      planet.class = 'orange'
      planet.name = 'FORTUNE'
    } else if (planet.metal > 50) {
      planet.class = 'purple'
      planet.name = 'HERMES'
    } else if (planet.crystal > 50) {
      planet.class = 'pink'
      planet.name = 'ATHENA'
    } else if (planet.oil > 50) {
      planet.class = 'grey'
      planet.name = 'HADES'
    } else if (planet.energy > 50) {
      planet.class = 'blue'
      planet.name = 'ZEUS'
    } else if (planet.influence > 50) {
      planet.class = 'red'
      planet.name = 'ARES'
    } else {
      planet.class = 'green'
      planet.name = 'GAIA'
    }
    planet.name += '-' + factory.total(planet)
  },
  number () {
    return 10 + Math.floor(Math.random() * 70) // [10, 70)
  },
  total (planet) {
    return planet.size + planet.metal + planet.crystal + planet.oil + planet.energy + planet.influence
  },
  build () {
    var planet = {
      image: factory.image(),
      size: factory.number(),
      metal: factory.number(),
      crystal: factory.number(),
      oil: factory.number(),
      energy: factory.number(),
      influence: factory.number()
    }
    factory.type(planet)
    return planet
  }
}

export default factory
