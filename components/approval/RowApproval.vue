<template>
  <div
    class="rounded bg-white shadow hover:shadow-md transform hover:scale-[1.01] transition px-4 py-3 grid grid-cols-3 md:grid-cols-4 items-center gap-x-4"
  >
    <nuxt-link
      v-if="approval.user"
      :to="`/users/approvals/${approval.id}`"
      class="flex items-center col-span-2"
    >
      <avatar
        :name="approval.user.name"
        :src="
          approval.user.product_thumbnail_url
            ? approval.user.product_thumbnail_url
            : ''
        "
        class="mr-3 flex-shrink-0 w-9 h-9"
      />
      <span class="flex flex-col">
        <span
          :class="[
            'block font-bold line-clamp-1',
            { 'mb-4': approval.user.city },
          ]"
          >{{ approval.user.name }}</span
        >
        <span v-if="approval.user.city" class="text-sm absolute"
          ><br />{{ approval.user.city.name }}</span
        >
      </span>
    </nuxt-link>
    <div class="leading-none text-right">
      <span class="text-sm text-gray-400">{{ $t('Updated at') }}</span>
      <div>
        {{ dateFormat(new Date(approval.updated_at), 'dd MMMM yyyy') }}
      </div>
    </div>
    <div class="flex justify-between items-center col-span-3 md:col-span-1">
      <span
        :class="[
          'badge',
          { 'yellow-600': approval.status === 'pending' },
          { 'red-100 opacity-50': approval.status === 'rejected' },
          { 'green-100 opacity-50': approval.status === 'approved' },
        ]"
        >{{ $t(approval.status) }}</span
      >
      <div class="text-right">
        <span class="text-sm text-gray-400">{{ $t('Changes') }}</span>
        <div class="text-lg font-bold">{{ changesCount }}</div>
      </div>
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
    approval: {
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
  computed: {
    changesCount(): number {
      let sot = this.approval.sot
      if (!sot) sot = {}
      let cnt = Object.keys(sot).length
      if (this.approval.changes_product_thumbnail_url) cnt++
      if (this.approval.changes_ktp_thumbnail_url) cnt++
      return cnt
    },
  },
})
</script>
