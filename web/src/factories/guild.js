const factory = {
  number () {
    return 0 + Math.floor(Math.random() * 200) // [0, 200)
  },
  build () {
    var guild = {
      name: 'GUILD',
      description: 'DESCRIPTION',
      members: factory.number(),
      influence: factory.number()
    }
    return guild
  }
}

export default factory
