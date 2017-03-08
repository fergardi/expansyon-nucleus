import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import moment from 'moment'

import App from './App.vue'
import Home from './views/Home.vue'
import Explore from './views/Explore.vue'
import Market from './views/Market.vue'
import Store from './views/Store.vue'
import Infrastructure from './views/Infrastructure.vue'
import Defense from './views/Defense.vue'
import Hangar from './views/Hangar.vue'
import Census from './views/Census.vue'
import Guild from './views/Guild.vue'
import Senate from './views/Senate.vue'
import Cantina from './views/Cantina.vue'
import Sell from './views/Sell.vue'
import Research from './views/Research.vue'
import Transmission from './views/Transmission.vue'
import Planetarium from './views/Planetarium.vue'

// router
Vue.use(VueRouter)
// routes
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/planetarium', component: Planetarium },
    { path: '/explore', component: Explore },
    { path: '/market', component: Market },
    { path: '/store', component: Store },
    { path: '/infrastructure', component: Infrastructure },
    { path: '/defense', component: Defense },
    { path: '/hangar', component: Hangar },
    { path: '/census', component: Census },
    { path: '/transmission', component: Transmission },
    { path: '/guild', component: Guild },
    { path: '/senate', component: Senate },
    { path: '/research', component: Research },
    { path: '/sell', component: Sell },
    { path: '/cantina', component: Cantina },
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
  return moment(parseInt(timestamp)).format('D/M/YYYY HH:mm:ss')
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
