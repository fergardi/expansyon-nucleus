import moment from 'moment'

var classes = [
  'red',
  'orange',
  'green',
  'indigo',
  'purple',
  'cyan',
  'yellow'
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
      date: moment().unix(),
      class: factory.class()
    }
    return message
  }
}

export default factory
