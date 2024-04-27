<template>
  <div :class="classObject">
    <input
      v-pikaday="computedOptions"
      type="text"
      v-bind="$attrs"
      v-on="$listenersExceptInput"
      @input="inputHandler"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TextInput from '~/components/form/TextInput.vue'

const defaultOptions = {
  format: 'yyyy-MM-dd',
}

export default Vue.extend({
  extends: TextInput,
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      now: '',
    }
  },
  computed: {
    computedOptions(): object {
      return { ...defaultOptions, ...this.options }
    },
  },
})
</script>
