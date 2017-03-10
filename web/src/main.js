import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import moment from 'moment'

import App from './App.vue'
import Home from './views/Home.vue'
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
import Account from './views/Account.vue'
import Help from './views/Help.vue'

// router
Vue.use(VueRouter)
// routes
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/planetarium', component: Planetarium },
    { path: '/market', component: Market },
    { path: '/trade', component: Trade },
    { path: '/store', component: Store },
    { path: '/research', component: Research },
    { path: '/hangar', component: Hangar },
    { path: '/infrastructure', component: Infrastructure },
    { path: '/defense', component: Defense },
    { path: '/explore', component: Explore },
    { path: '/cantina', component: Cantina },
    { path: '/relicarium', component: Relicarium },
    { path: '/temple', component: Temple },
    { path: '/senate', component: Senate },
    { path: '/census', component: Census },
    { path: '/guild', component: Guild },
    { path: '/transmission', component: Transmission },
    { path: '/account', component: Account },
    { path: '/help', component: Help },
    { path: '*', redirect: '/' }
  ]
})

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
    Main.close('left')
    Main.close('right')
    next()
  })
})

// main app
let Main = Vue.component('app', App)
Main = new Main({
  el: '#app',
  router
})
