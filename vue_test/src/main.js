import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Rendering from './components/Rendering.vue'
import Animation from './components/Animation.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/rendering' },
  { path: '/rendering', name: Rendering, component: Rendering, props: true },
  { path: '/animation', component: Animation }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
