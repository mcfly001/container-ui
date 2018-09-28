import PriceKeyboard from './components/PriceKeyboard.vue'

const install = function(Vue, options = {}){
  if(install.installed) return
  Vue.component(PriceKeyboard.name, PriceKeyboard)
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default PriceKeyboard
