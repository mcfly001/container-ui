import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'
import Cellswipe from '../views/content/Cellswipe.md'

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
    path: '/Cellswipe',
    name: 'Cellswipe',
    component: Cellswipe
  }
]