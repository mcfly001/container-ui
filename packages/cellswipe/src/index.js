import CellSwipe from './components/CellSwipe.vue'
import './index.css'
import './test.scss'

const install = function(Vue, options = {}){
  if(install.installed) return
  Vue.component(CellSwipe.name, CellSwipe)
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

module.exports = {
  install,
  CellSwipe
}
