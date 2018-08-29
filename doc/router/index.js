import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'
import cellswipe from '../views/content/cellswipe.md'

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
    path: '/cellswipe',
    name: 'cellswipe',
    component: cellswipe
  }
]