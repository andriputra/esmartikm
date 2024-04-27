<template>
  <div :class="classObject">
    <multiselect
      v-bind="$attrs"
      v-on="$listenersExceptInput"
      @input="inputHandler"
    >
      <template v-for="(_, slot) of $scopedSlots" #[slot]="scope"
        ><slot :name="slot" v-bind="scope"
      /></template>
    </multiselect>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Multiselect from 'vue-multiselect'

export default Vue.extend({
  components: { Multiselect },
  inheritAttrs: false,
  props: {
    error: { type: Boolean, default: false },
  },
  computed: {
    $listenersExceptInput(): object {
      const listeners = this.$listeners // exclude `input`-listener
      delete listeners.input
      return listeners
    },
    classObject(): any[] {
      return ['rich-select', { 'rich-select--error': this.error }]
    },
  },
  methods: {
    inputHandler(e: Event): void {
      this.$emit('input', e)
    },
  },
})
</script>
