import OpenApp from './components/OpenApp.vue'

const install = function (Vue, options = {}) {
  if (install.installed) return
  Vue.component(OpenApp.name, OpenApp)
}

if(typeof winodw !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default OpenApp
