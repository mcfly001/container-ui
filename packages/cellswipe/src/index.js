import CellSwipe from './components/CellSwipe.vue'

const install = function(Vue, options = {}){
  if(install.installed) return
  Vue.component(CellSwipe.name, CellSwipe)
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default{
  CellSwipe
}
