<template>
  <component :is="tagName">
    <slot name="toggle" />
    <div v-dropdown="options" :class="classObject">
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import Vue from 'vue'
import Dropdown from '~/assets/js/dropdown.js'

export default Vue.extend({
  directives: {
    dropdown: {
      inserted(element, binding): void {
        /* eslint-disable-next-line no-new */
        new Dropdown(element, binding.value)
      },
    },
  },
  props: {
    tagName: { type: String, default: 'div' },
    menu: { type: Boolean, default: false },
    options: {
      type: Object,
      default(): object {
        return {
          trigger: 'mouseenter focus',
        }
      },
    },
  },
  computed: {
    classObject(): any[] {
      return ['dropdown', { 'dropdown--menu': this.menu }]
    },
  },
})
</script>
