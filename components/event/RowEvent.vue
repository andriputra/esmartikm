<template>
  <div
    class="rounded bg-white shadow hover:shadow-md transform hover:scale-[1.01] transition px-4 py-3 grid grid-cols-3 md:grid-cols-5 items-center gap-x-4"
  >
    <nuxt-link :to="`/events/${event.id}`" class="flex items-center col-span-2">
      <span class="flex flex-col">
        <span class="block font-bold line-clamp-1 mb-4">{{ event.name }}</span>
        <span class="text-sm absolute"><br />{{ event.date_indo }}</span>
      </span>
    </nuxt-link>
    <div
      class="leading-none text-right col-span-3 md:col-span-2 order-last md:order-none"
    >
      <template v-if="event.speakers">
        <span class="text-sm text-gray-400">{{ $t('Speaker') }}</span>
        <div>
          {{ event.speakers }}
        </div>
      </template>
    </div>
    <div class="flex justify-end items-center text-right col-span-1">
      <div class="text-right">
        <span class="text-sm text-gray-400">{{ $t('Participants') }}</span>
        <div class="text-lg font-bold">{{ event.users_count }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    event: {
      type: Object,
      default() {
        return {}
      },
    },
  },
})
</script>
