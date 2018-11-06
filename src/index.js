import Vue2InteractDraggable from './components/Vue2InteractDraggable.vue'
import InteractEventBus from './interact-event-bus.js';

const plugin = {
  install (Vue) {
    Vue.component('Vue2InteractDraggable', Vue2InteractDraggable)
  }
}

export { Vue2InteractDraggable };
export { InteractEventBus };

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
