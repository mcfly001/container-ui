import Test from './components/Test.vue'

const install = function(Vue, options = {}){
  if(install.installed) return
  Vue.component(Test.name, Test)
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default Test
