<template>
  <select-category
    :value="Number($route.query.sub_category_id)"
    allow-empty
    :event-id="eventId"
    @input="subcategoryInputHandler"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import SelectCategory from '~/components/category/SelectCategory.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: { SelectCategory },
  props: {
    eventId: {
      type: Number,
      default: null,
    },
  },
  methods: {
    subcategoryInputHandler(subcategoryId: string): void {
      if (!subcategoryId) {
        appendToQuery(this, { sub_category_id: '' })
        return
      }

      appendToQuery(this, { sub_category_id: subcategoryId })
    },
  },
})
</script>
