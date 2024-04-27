<template>
  <nuxt-child />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'admin',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ params, store }) {
    await store.dispatch('events/model/LOAD', Number(params.id))
  },
})
</script>
