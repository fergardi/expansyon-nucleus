import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import moment from 'moment'

import App from './App.vue'
import Planetarium from './views/Planetarium.vue'
import Market from './views/Market.vue'
import Trade from './views/Trade.vue'
import Store from './views/Store.vue'
import Research from './views/Research.vue'
import Hangar from './views/Hangar.vue'
import Infrastructure from './views/Infrastructure.vue'
import Defense from './views/Defense.vue'
import Explore from './views/Explore.vue'
import Cantina from './views/Cantina.vue'
import Relicarium from './views/Relicarium.vue'
import Temple from './views/Temple.vue'
import Senate from './views/Senate.vue'
import Census from './views/Census.vue'
import Guild from './views/Guild.vue'
import Transmission from './views/Transmission.vue'
import Status from './views/Status.vue'
import Profile from './views/Profile.vue'
import Help from './views/Help.vue'
import Login from './views/Login.vue'
import Splash from './views/Splash.vue'

import vuex from './vuex/vuex'

// router
Vue.use(VueRouter)
// routes
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/planetarium', component: Planetarium, name: 'planetarium' },
    { path: '/market', component: Market, name: 'market' },
    { path: '/trade', component: Trade, name: 'trade' },
    { path: '/store', component: Store, name: 'store' },
    { path: '/research', component: Research, name: 'research' },
    { path: '/hangar', component: Hangar, name: 'hangar' },
    { path: '/infrastructure', component: Infrastructure, name: 'infrastructure' },
    { path: '/defense', component: Defense, name: 'defense' },
    { path: '/explore', component: Explore, name: 'explore' },
    { path: '/cantina', component: Cantina, name: 'cantina' },
    { path: '/relicarium', component: Relicarium, name: 'relicarium' },
    { path: '/temple', component: Temple, name: 'temple' },
    { path: '/senate', component: Senate, name: 'senate' },
    { path: '/census', component: Census, name: 'census' },
    { path: '/guild', component: Guild, name: 'guild' },
    { path: '/transmission', component: Transmission, name: 'transmission' },
    { path: '/status', component: Status, name: 'status' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/help', component: Help, name: 'help' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/splash', component: Splash, name: 'splash' },
    { path: '*', redirect: '/' }
  ]
})

// secured routes
const security = [
  'planetarium',
  'market',
  'trade',
  'store',
  'research',
  'hangar',
  'infrastructure',
  'defense',
  'explore',
  'cantina',
  'relicarium',
  'temple',
  'senate',
  'census',
  'guild',
  'transmission',
  'status',
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
  },
  // light
  light: {
    primary: {
      color: 'blue-grey',
      hue: '400'
    },
    accent: 'green',
    warn: 'red'
  },
  // dark
  dark: {
    primary: {
      color: 'blue-grey',
      hue: '900'
    },
    accent: 'green',
    warn: 'red'
  }
})

// filter
Vue.filter('date', (timestamp) => {
  return moment(parseInt(timestamp)).format('DD/MM/YY HH:mm:ss')
})
Vue.filter('lorem', (string) => {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
})

// scroll to top and close sidebar
router.beforeEach((to, from, next) => {
  Vue.nextTick(() => {
    if (document.getElementById('scroll')) document.getElementById('scroll').scrollIntoView(true)
    // Main.close('left')
    // Main.close('right')
    if ((security.indexOf(to.name) !== -1) && !vuex.state.logged) {
      router.push({ path: '/login' })
    } else {
      return next()
    }
  })
})

// main app
let Main = Vue.component('app', App) // eslint-disable-line
Main = new Main({
  el: '#app',
  router
})
