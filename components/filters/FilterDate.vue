<template>
  <div class="relative">
    <date-picker
      :value="$route.query[attr]"
      :options="{ format: 'yyyy-MM-dd' }"
      v-bind="$attrs"
      @input="inputHandler"
    />
    <svg-icon
      v-if="$route.query[attr]"
      name="close"
      class="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer mr-2 text-gray-500"
      @click="clearClickHandler"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DatePicker from '~/components/form/DatePicker.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: { DatePicker },
  inheritAttrs: false,
  props: {
    attr: { type: String, default: 'date' },
  },
  methods: {
    inputHandler(value: string): void {
      appendToQuery(this, { [this.attr]: value })
    },
    clearClickHandler(): void {
      appendToQuery(this, { [this.attr]: '' })
    },
  },
})
</script>
