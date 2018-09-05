import OpenApp from './components/OpenApp.vue'

const openApp = {
  install(Vue, options){
    Vue.component('OpenApp', OpenApp)
  }
}

if(typeof winodw !== 'undefined' && window.Vue){
  window.Vue.use(OpenApp)
}

export default openApp
