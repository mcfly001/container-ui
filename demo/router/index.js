import Vue from 'vue'
import Router from 'vue-router'
import Introduce from '../views/Introduce.vue'
import Develop from '../views/Develop.vue'
import OpenApp from '../views/OpenApp.vue'
import Test from '../views/Test.vue'

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/Introduce'
  },
  {
    path: '/Introduce',
    name: 'Introduce',
    component: Introduce
  },
  {
    path: '/Develop',
    name: 'Develop',
    component: Develop
  },
  {
    path: '/OpenApp',
    name: 'OpenApp',
    component: OpenApp
  },
  {
    path: '/Test',
    name: 'Test',
    component: Test
  }
]

export default new Router({
  routes
})
