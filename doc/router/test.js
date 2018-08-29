import Introduce from '../views/Introduce.vue'
import Develop from '../views/Develop.vue'
import test from '../views/test.vue'
import cellswipe from '../views/cellswipe.vue'

export const routes = [
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
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/cellswipe',
    name: 'cellswipe',
    component: cellswipe
  }
]