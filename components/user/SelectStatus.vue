<template>
  <rich-select
    v-bind="$attrs"
    :options="options"
    :searchable="false"
    :custom-label="customLabel"
    v-on="$listenersExceptInput"
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import RichSelect from '~/components/form/RichSelect.vue'

export default Vue.extend({
  components: { RichSelect },
  data() {
    return {
      options: ['pending', 'approved', 'rejected'],
    }
  },
  computed: {
    $listenersExceptInput(): object {
      const listeners = this.$listeners // exclude `input`-listener
      delete listeners.input
      return listeners
    },
  },
  methods: {
    customLabel(val: string): string {
      return val.charAt(0).toUpperCase() + val.slice(1)
    },
  },
})
</script>
