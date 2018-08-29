import HelloWorld from './components/HelloWorld.vue'

const install = function(Vue, options = {}){
  if(install.installed) return
  Vue.component(HelloWorld.name, HelloWorld)
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

module.exports = {
  install,
  HelloWorld
}
