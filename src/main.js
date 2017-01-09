// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material'

// custom components
import Navigation from './components/Navigation/navigation'
import Sidebar from './components/Sidebar/sidebar'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueMaterial)

const store = new Vuex.Store({
  state: {
    user: {
      first_name: 'Matthew'
    }
  },
  mutations: {

  }
})

import routes from 'src/routes'

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
export const tracking = new Vue({
  router,
  store,
  components: {
    Navigation,
    Sidebar
  }
}).$mount('#app')
