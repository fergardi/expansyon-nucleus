const constants = {
  dev: {
    api: '//localhost:34567/api',
    socket: '//localhost:34567'
  },
  production: {
    api: 'https://www.expansyon.com/api',
    socket: 'https://www.expansyon.com/'
  }
}

// env
var env = process.env.NODE_ENV || 'dev'

export default constants[env]
