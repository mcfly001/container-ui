import Introduce from '../views/content/Introduce.md'
import Develop from '../views/content/Develop.md'
import OpenApp from '../views/content/OpenApp.md'
import PriceInput from '../views/content/PriceInput.md'
import PricePopup from '../views/content/PricePopup.md'

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
    path: '/PriceInput',
    name: 'PriceInput',
    component: PriceInput
  },
  {
    path: '/PricePopup',
    name: 'PricePopup',
    component: PricePopup
  }
]