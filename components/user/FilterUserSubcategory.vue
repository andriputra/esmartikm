<template>
  <select-category
    :value="Number($route.query.sub_category_id)"
    allow-empty
    @input="subcategoryInputHandler"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import SelectCategory from '~/components/user/SelectUserCategory.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: { SelectCategory },
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
