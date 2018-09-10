import PriceInput from './components/PriceInput.vue'

const install = function(Vue, options = {}){
  if(install.installed) return
  Vue.component(PriceInput.name, PriceInput)
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default PriceInput
