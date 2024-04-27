import Vue from 'vue'
import Toastify from 'toastify-js'

interface IToast {
  show: () => void
  hide: () => void
}

type toastType = 'success' | 'error'

declare module 'vue/types/vue' {
  // this.$api inside Vue components
  interface Vue {
    $toast(type: toastType, options: object): IToast
  }
}

class Toast {
  toastify: any

  constructor(type: toastType, options: object) {
    let className = 'toast'

    if (type === 'success') {
      className = 'toast--success'
    }

    if (type === 'error') {
      className = 'toast--error'
    }

    this.toastify = Toastify({
      gravity: 'bottom',
      position: 'center',
      className,
      ...options,
    })
  }

  show() {
    this.toastify.showToast()
  }

  hide() {
    this.toastify.hideToast()
  }
}

Vue.prototype.$toast = (type: toastType, options: object) =>
  new Toast(type, options)
