module.exports = IndexTep = function (name) {
  return `
  import ${name} from './components/${name}.vue'

  const install = function(Vue, options = {}){
    if(install.installed) return
    Vue.component(${name}.name, ${name})
  }

  if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
  }

  module.exports = {
    install,
    ${name}
  }
  `
}