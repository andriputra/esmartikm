<template>
  <nuxt-link
    :to="`/users/${user.id}`"
    class="block rounded-lg border relative"
    :title="user.name"
  >
    <span
      :class="[
        'badge absolute top-3 left-3 rounded border border-white px-3 py-0.5 capitalize font-bold',
        { 'yellow-500 text-white': user.status === 'pending' },
        { 'red-500 text-white': user.status === 'rejected' },
        { 'green-500 text-white': user.status === 'approved' },
      ]"
      >{{ $t(user.status) }}</span
    >
    <img
      :src="user.product_thumbnail_url ? user.product_thumbnail_url : ''"
      class="w-full h-[175px] object-cover rounded-t-lg"
    />
    <span class="border-t flex flex-col py-3 px-5">
      <span class="text-lg font-bold line-clamp-2 leading-none mb-2">{{
        user.name
      }}</span>
      <span v-if="user.city" class="text-sm">{{ user.city.name }}</span>
      <span class="flex justify-between mt-3">
        <span class="text-gray-400 text-sm"
          >{{ $t('Submitted at') }}
          {{ dateFormat(new Date(user.created_at), 'dd MMM yyyy') }}</span
        >
        <span class="text-gray-400 text-sm"
          ><svg-icon name="visibility" /> {{ user.viewed }}</span
        >
      </span>
    </span>
  </nuxt-link>
  <!-- <div
    class="rounded bg-white shadow hover:shadow-md transform hover:scale-[1.01] transition px-4 py-3 grid grid-cols-3 md:grid-cols-4 items-center gap-x-4"
  >
    <nuxt-link :to="`/users/${user.id}`" class="flex items-center col-span-2">
      <avatar
        :name="user.name"
        :src="user.product_thumbnail_url ? user.product_thumbnail_url : ''"
        class="mr-3 flex-shrink-0"
      />
      <span class="flex flex-col">
        <span class="block font-bold line-clamp-1 mb-4">{{ user.name }}</span>
        <span v-if="user.city" class="text-sm absolute"
          ><br />{{ user.city.name }}</span
        >
      </span>
    </nuxt-link>
    <div class="leading-none text-right">
      <span class="text-sm text-gray-400">{{ $t('Submitted at') }}</span>
      <div>
        {{ dateFormat(new Date(user.created_at), 'dd MMMM yyyy') }}
      </div>
    </div>
    <div class="flex justify-between items-center col-span-3 md:col-span-1">
      <span
        :class="[
          'badge',
          { 'yellow-600': user.status === 'pending' },
          { 'red-100 opacity-50': user.status === 'rejected' },
          { 'green-100 opacity-50': user.status === 'approved' },
        ]"
        >{{ $t(user.status) }}</span
      >
      <div class="text-right">
        <span class="text-sm text-gray-400">{{ $t('Views') }}</span>
        <div class="text-lg font-bold">{{ user.viewed }}</div>
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
import Vue from 'vue'
import dateFormat from 'date-fns/format'

export default Vue.extend({
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
