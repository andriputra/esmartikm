import Vue from 'vue'

import LightBox from 'vue-it-bigger'
import 'vue-it-bigger/dist/vue-it-bigger.min.css'

const plugin = {
  install() {
    Vue.component('LightBox', LightBox)
  },
}

Vue.use(plugin)
