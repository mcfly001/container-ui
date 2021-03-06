import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'
import OpenApp from '../views/content/OpenApp.md'
import PriceKeyboard from '../views/content/PriceKeyboard.md'
import FireUpload from '../views/content/FireUpload.md'

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
    path: '/PriceKeyboard',
    name: 'PriceKeyboard',
    component: PriceKeyboard
  },
  {
    path: '/FireUpload',
    name: 'FireUpload',
    component: FireUpload
  }
]