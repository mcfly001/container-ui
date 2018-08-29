import Vue from 'vue'
import Router from 'vue-router'
import Introduce from '../views/Introduce.vue'
import Develop from '../views/Develop.vue'
import CellSwipe from '../views/CellSwipe.vue'

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
    name: 'CellSwipe',
    path: '/CellSwipe',
    component: CellSwipe
  }
]

export default new Router({
  routes
})
