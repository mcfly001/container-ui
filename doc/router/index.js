import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'
import CellSwipe from '../views/content/CellSwipe.md'

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
    path: '/CellSwipe',
    name: 'CellSwipe',
    component: CellSwipe
  }
]