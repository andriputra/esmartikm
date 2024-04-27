<template>
  <avatar
    v-viewer="options"
    v-bind="$attrs"
    :src="source"
    class="cursor-pointer"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Avatar from '~/components/Avatar.vue'

export default Vue.extend({
  components: { Avatar },
  props: {
    src: { type: String, required: true },
    origin: { type: String, default: '' },
  },
  computed: {
    options() {
      return {
        url(image: any) {
          const splitted = image.src.split('?orig=')

          if (splitted[1]) {
            return Buffer.from(splitted[1], 'base64').toString()
          }

          return image.src
        },
      }
    },
    source() {
      if (!this.origin) {
        return this.src
      }

      return `${this.src}?orig=${Buffer.from(this.origin).toString('base64')}`
    },
  },
})
</script>
