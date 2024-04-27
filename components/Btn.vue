<template>
  <component
    :is="tagName"
    v-bind="$attrs"
    :class="classObject"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import Vue from 'vue'

enum Variant {
  outline = 'outline',
  flat = 'flat',
  icon = 'icon',
  gradient = 'gradient',
}

enum TagName {
  button = 'button',
  a = 'a',
}

export default Vue.extend({
  props: {
    variant: { type: String as () => Variant, default: '' },
    tagName: { type: String as () => TagName, default: 'button' },
  },
  computed: {
    classObject(): any[] {
      return [
        'button',
        { 'button--outline': this.variant === 'outline' },
        { 'button--flat': this.variant === 'flat' },
        { 'button--icon': this.variant === 'icon' },
        { 'button--gradient': this.variant === 'gradient' },
      ]
    },
  },
})
</script>
