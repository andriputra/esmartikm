<template>
  <label :class="classObject">
    <slot>{{ label }}</slot>
    <input
      class="checkbox"
      type="radio"
      :checked="isChecked"
      :value="value"
      :disabled="disabled"
      @change="$emit('change', $event.target.value)"
    />
    <span class="radiobox__mark"></span>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    label: { type: String, default: '' },
    modelValue: { type: [String, Number], default: '' },
    value: { type: [String, Number], default: undefined },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
  },
  computed: {
    isChecked() {
      return String(this.modelValue) === String(this.value)
    },
    classObject(): any[] {
      return ['radiobox', { 'radiobox--error': this.error }]
    },
  },
})
</script>
