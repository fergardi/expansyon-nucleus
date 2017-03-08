var classes = [
  'red',
  'orange',
  'green',
  'blue',
  'purple',
  'pink'
]

const factory = {
  class () {
    return classes[Math.floor(Math.random() * classes.length)]
  },
  build () {
    var message = {
      title: 'MESSAGE',
      text: 'TEXT',
      from: 'PLAYER',
      date: new Date().toLocaleString(),
      class: factory.class()
    }
    return message
  }
}

export default factory
