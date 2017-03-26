import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import VueSocketio from 'vue-socket.io'
import VueInternationalization from 'vue-i18n'

import moment from 'moment'

import App from './App.vue'
import Empire from './views/Empire.vue'
import Planetarium from './views/Planetarium.vue'
import Market from './views/Market.vue'
import Store from './views/Store.vue'
import Research from './views/Research.vue'
import Hangar from './views/Hangar.vue'
import Infrastructure from './views/Infrastructure.vue'
import Defense from './views/Defense.vue'
import Exploration from './views/Exploration.vue'
import Cantina from './views/Cantina.vue'
import Relicarium from './views/Relicarium.vue'
import Temple from './views/Temple.vue'
import Senate from './views/Senate.vue'
import Census from './views/Census.vue'
import Guild from './views/Guild.vue'
import Transmission from './views/Transmission.vue'
import Achievement from './views/Achievement.vue'
import Profile from './views/Profile.vue'
import Help from './views/Help.vue'
import Login from './views/Login.vue'
import Splash from './views/Splash.vue'

import store from './vuex/store'
import constants from './config/constants'
import i18n from './services/i18n'

// socketio
Vue.use(VueSocketio, constants.socket)

// i18n
Vue.use(VueInternationalization)
Vue.config.lang = 'es'
Object.keys(i18n).forEach(function (lang) {
  Vue.locale(lang, i18n[lang])
})

// router
Vue.use(VueRouter)

// routes
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/empire', component: Empire, name: 'empire' },
    { path: '/planetarium', component: Planetarium, name: 'planetarium' },
    { path: '/market', component: Market, name: 'market' },
    { path: '/store', component: Store, name: 'store' },
    { path: '/research', component: Research, name: 'research' },
    { path: '/hangar', component: Hangar, name: 'hangar' },
    { path: '/infrastructure', component: Infrastructure, name: 'infrastructure' },
    { path: '/defense', component: Defense, name: 'defense' },
    { path: '/exploration', component: Exploration, name: 'exploration' },
    { path: '/cantina', component: Cantina, name: 'cantina' },
    { path: '/relicarium', component: Relicarium, name: 'relicarium' },
    { path: '/temple', component: Temple, name: 'temple' },
    { path: '/senate', component: Senate, name: 'senate' },
    { path: '/census', component: Census, name: 'census' },
    { path: '/guild', component: Guild, name: 'guild' },
    { path: '/transmission', component: Transmission, name: 'transmission' },
    { path: '/achievement', component: Achievement, name: 'achievement' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/help', component: Help, name: 'help' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/splash', component: Splash, name: 'splash' },
    { path: '*', redirect: '/login' }
  ]
})

// secured routes
const security = [
  'empire',
  'planetarium',
  'market',
  'store',
  'research',
  'hangar',
  'infrastructure',
  'defense',
  'exploration',
  'cantina',
  'relicarium',
  'temple',
  'senate',
  'census',
  'guild',
  'transmission',
  'achievement',
  'profile',
  'help'
]

// material
Vue.use(VueMaterial)
Vue.material.registerTheme({
  // fallback
  default: {
    primary: {
      color: 'blue-grey',
      hue: '900'
    },
    accent: 'green',
    warn: 'red'
  }
  /* TODO FIX
  default: {
    primary: {
      color: 'blue-grey',
      hue: '900'
    },
    accent: {
      color: 'light-green',
      hue: 'A700'
    },
    warn: {
      color: 'red',
      hue: 'A700'
    }
  }
  */
})

// filter
Vue.filter('date', (date) => {
  var datetime = date || new Date()
  return moment(datetime).format('DD/MM/YY HH:mm:ss')
})
Vue.filter('format', (quantity) => {
  var number = quantity || 0
  return number.toLocaleString()
})
Vue.filter('lorem', (string) => {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
})
Vue.filter('i18n', (string) => {
  return Vue.t(string)
})

// scroll to top and close sidebar
router.beforeEach((to, from, next) => {
  Vue.nextTick(() => {
    Main.clear()
    store.commit('clear')
    if (document.getElementById('main')) document.getElementById('main').scrollIntoView(true)
    if ((security.indexOf(to.name) !== -1) && !store.state.account.logged) {
      router.push({ path: '/login' })
    } else {
      return next()
    }
  })
})

// main app
let Main = Vue.component('app', App)
Main = new Main({
  el: '#app',
  router
})
