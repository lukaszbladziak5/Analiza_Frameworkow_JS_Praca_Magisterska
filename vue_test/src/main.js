import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Rendering from './components/Rendering.vue'
import Animation from './components/Animation.vue'
import Server from './components/Server.vue'
import Map from './components/Map.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/rendering', name: Rendering, component: Rendering, props: true },
  { path: '/animation', component: Animation },
  { path: '/server', component: Server },
  { path: '/map', component: Map }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
