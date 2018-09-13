import InputPrice from './components/InputPrice.vue'

const install = function(Vue, options = {}){
  if(install.installed) return
  Vue.component(InputPrice.name, InputPrice)
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default InputPrice
