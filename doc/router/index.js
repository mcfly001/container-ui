import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'
import OpenApp from '../views/content/OpenApp.md'
import Test from '../views/content/Test.md'

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