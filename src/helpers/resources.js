import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options = {
  root: process.env.CS_URL
}

// var token = '';

// Vue.http.headers.common['x-access-token'] = token;

Vue.http.interceptors.push((request, next) => {
  next((response) => {

  })
})

export const testResource = Vue.resource(Vue.http.options.root + '/test')
