import store from '../vuex/store'

const notification = {
  open: (alert) => {
    store.commit('notification', alert)
  },
  success: (text) => {
    notification.open({ class: 'md-accent', text: text })
  },
  error: (text) => {
    notification.open({ class: 'md-warn', text: text })
  }
}

export default notification
