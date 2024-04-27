<template>
  <label :class="classObject">
    <input
      class="checkbox"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      :disabled="disabled"
      @change="updateInput"
    />
    <slot>{{ label }}</slot>
    <span class="checkbox__mark"></span>
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
    value: { type: [String, Number, Boolean], default: true },
    modelValue: { type: [String, Number, Boolean, Array], default: '' },
    label: { type: String, default: '' },
    trueValue: { type: [String, Number, Boolean, Array], default: true },
    falseValue: { type: [String, Number, Boolean, Array], default: false },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
  },
  computed: {
    isChecked(): boolean {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }

      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue
    },
    classObject(): any[] {
      return ['checkbox', { 'checkbox--error': this.error }]
    },
  },
  methods: {
    updateInput(event: any): void {
      const isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    },
  },
})
</script>
