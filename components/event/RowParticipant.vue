<template>
  <div
    class="rounded bg-white shadow hover:shadow-md transform hover:scale-[1.01] transition px-4 py-3 grid grid-cols-4 items-center gap-x-4 group"
  >
    <nuxt-link :to="`/users/${user.id}`" class="flex items-center col-span-2">
      <avatar
        :name="user.name"
        :src="user.product_thumbnail_url ? user.product_thumbnail_url : ''"
        class="mr-3 flex-shrink-0"
      />
      <span class="flex flex-col">
        <span class="block font-bold line-clamp-2">{{ user.name }}</span>
      </span>
    </nuxt-link>
    <div class="leading-none text-right">
      <span class="text-sm text-gray-400">{{ $t('Registered at') }}</span>
      <div>
        {{ dateFormat(new Date(user.pivot.created_at), 'dd MMMM yyyy') }}
      </div>
    </div>
    <div class="flex justify-end">
      <button
        class="button button--icon red-700 hidden group-hover:block"
        @click="$emit('delete', user.id)"
      >
        <svg-icon name="delete" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dateFormat from 'date-fns/format'
import Avatar from '~/components/Avatar.vue'

export default Vue.extend({
  components: { Avatar },
  props: {
    user: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      dateFormat,
    }
  },
})
</script>
