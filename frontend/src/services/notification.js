import store from './vuex/store'

const notification = {
  open: (alert) => {
    store.commit('notification', alert)
  },
  info: (text) => {
    notification.open({ class: 'md-primary', text: text })
  },
  success: (text) => {
    notification.open({ class: 'md-accent', text: text })
  },
  warning: (text) => {
    notification.open({ class: 'md-warn', text: text })
  }
}

export default notification
