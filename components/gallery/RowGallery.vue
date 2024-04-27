<template>
  <div
    class="rounded bg-white shadow hover:shadow-md transform hover:scale-[1.01] transition px-4 py-3"
  >
    <nuxt-link :to="`/gallery/${gallery.id}`" class="flex items-center">
      <avatar
        v-if="gallery.type === 'image'"
        :name="gallery.title"
        :src="gallery.media_thumbnail_url ? gallery.media_thumbnail_url : ''"
        class="mr-3 flex-shrink-0"
      />
      <avatar
        v-else-if="gallery.type === 'video'"
        :name="gallery.title"
        :src="`https://img.youtube.com/vi/${gallery.media}/hqdefault.jpg`"
        class="mr-3 flex-shrink-0"
      />
      <span class="flex-1 flex flex-col">
        <span class="block font-bold line-clamp-2">{{ gallery.title }}</span>
      </span>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Avatar from '~/components/Avatar.vue'

export default Vue.extend({
  components: { Avatar },
  props: {
    gallery: {
      type: Object,
      default() {
        return {}
      },
    },
  },
})
</script>
