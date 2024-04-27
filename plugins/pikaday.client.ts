import Vue from 'vue'
import Pikaday from 'pikaday'
import dateFormat from 'date-fns/format'
import dateParse from 'date-fns/parse'

const instanceMap = new Map()

Vue.use({
  install(Vue) {
    Vue.directive('pikaday', {
      bind(element, binding): void {
        const instanceOptions = binding.value || {}

        // override `field`, `toString`, `parse` and `onSelect` option
        instanceOptions.field = element
        instanceOptions.toString = function (date: Date, format: string) {
          return dateFormat(date, format)
        }
        instanceOptions.parse = function (dateStr: string, format: string) {
          return dateParse(dateStr, format, new Date())
        }
        instanceOptions.onSelect = function () {
          const input = element as HTMLInputElement
          input.value = this.toString()
          input.dispatchEvent(new Event('input', { bubbles: true }))
        }

        const instance = new Pikaday(instanceOptions)
        instanceMap.set(element, instance)
      },
      unbind(element): void {
        instanceMap.get(element).destroy()
      },
    })
  },
})
