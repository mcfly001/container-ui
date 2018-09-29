import FireUpload from './components/FireUpload.vue'

const install = function(Vue, options = {}){
  if(install.installed) return
  Vue.component(FireUpload.name, FireUpload)
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default FireUpload
