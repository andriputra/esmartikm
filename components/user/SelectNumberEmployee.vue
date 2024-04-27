<template>
  <rich-select
    v-bind="$attrs"
    :options="options"
    :placeholder="$t('Select Number of Employees')"
    :show-labels="false"
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
      options: ['1-19 Orang', '>= 20 Orang'],
    }
  },
  computed: {
    $listenersExceptInput(): object {
      const listeners = this.$listeners // exclude `input`-listener
      delete listeners.input
      return listeners
    },
  },
})
</script>
