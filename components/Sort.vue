<template>
  <rich-select
    :value="$route.query.sort ? $route.query.sort : ''"
    :options="options.map((opt) => opt.value)"
    :custom-label="customLabel"
    :searchable="false"
    :placeholder="$t('Sort')"
    :show-labels="false"
    @input="inputHandler"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import RichSelect from '~/components/form/RichSelect.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: { RichSelect },
  props: {
    options: { type: Array, default: () => [] },
  },
  methods: {
    inputHandler(value: string): void {
      appendToQuery(this, {
        sort: value,
        page: '',
      })
    },
    customLabel(val: number): string {
      const option: any = this.options.find((opt: any) => opt.value === val)
      if (option) return option.text
      return ''
    },
  },
})
</script>
