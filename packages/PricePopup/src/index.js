import PricePopup from './components/PricePopup.vue'

const install = function(Vue, options = {}){
  if(install.installed) return
  Vue.component(PricePopup.name, PricePopup)
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default PricePopup
