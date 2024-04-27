<template>
  <div :class="classObject">
    <div v-if="label || inline" :class="labelClassObject">
      {{ label }}
      <span v-if="required" class="text-red-700 text-lg">*</span>
    </div>
    <div :class="fieldClassObject">
      <slot />
      <p v-if="error && feedback" class="field__feedback">
        {{ typeof feedback === 'string' ? feedback : feedback[0] }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    label: { type: String, default: '' },
    labelClass: { type: [String, Object], default: '' },
    fieldClass: { type: [String, Object], default: '' },
    error: { type: Boolean, default: false },
    feedback: { type: [String, Array], default: '' },
    inline: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  computed: {
    classObject(): any[] {
      return [
        'field',
        { 'field--error': this.error },
        { 'field--inline': this.inline },
      ]
    },
    labelClassObject(): any[] {
      return ['field__label', this.labelClass]
    },
    fieldClassObject(): any[] {
      return ['field__input', this.fieldClass]
    },
  },
})
</script>
