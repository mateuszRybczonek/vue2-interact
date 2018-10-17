import Vue2Interact from './components/Vue2Interact.vue'

const plugin = {
  install (Vue) {
    Vue.component('Vue2Interact', Vue2Interact)
  }
}

export default Vue2Interact;

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
