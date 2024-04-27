<template>
  <div :class="classObject">
    <textarea
      v-if="type === 'textarea'"
      v-bind="$attrs"
      v-on="$listenersExceptInput"
      @input="inputHandler"
    />
    <input
      v-else
      :type="type"
      v-bind="$attrs"
      v-on="$listenersExceptInput"
      @input="inputHandler"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  inheritAttrs: false,
  props: {
    error: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
  },
  computed: {
    $listenersExceptInput(): object {
      const listeners = this.$listeners // exclude `input`-listener
      delete listeners.input
      return listeners
    },
    classObject(): any[] {
      return ['text-input', { 'text-input--error': this.error }]
    },
  },
  methods: {
    inputHandler(e: Event): void {
      const target = e.target as HTMLInputElement
      this.$emit('input', target.value)
    },
  },
})
</script>
