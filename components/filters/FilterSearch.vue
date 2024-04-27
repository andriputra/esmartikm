<template>
  <text-input
    type="text"
    :value="$route.query[attr]"
    :placeholder="$t(placeholder)"
    @change="searchHandler"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import TextInput from '~/components/form/TextInput.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: { TextInput },
  props: {
    attr: { type: String, default: 'name' },
    placeholder: { type: String, default: 'Search' },
  },
  methods: {
    searchHandler(event: Event): void {
      const target: HTMLInputElement = event.target as HTMLInputElement
      appendToQuery(this, { [this.attr]: target.value })
    },
  },
})
</script>
