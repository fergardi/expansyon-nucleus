const constants = {
  dev: {
    api: '//localhost:34567/api',
    socket: '//localhost:34567'
  },
  production: {
    api: 'http://192.168.0.11:34567/api',
    socket: 'http://192.168.0.11:34567'
  }
}

// env
var env = process.env.NODE_ENV || 'dev'

export default constants[env]
