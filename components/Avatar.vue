<template>
  <span class="avatar" v-on="$listeners">
    <img v-if="src" :src="src" :class="frameClass" />
    <span v-else :class="frameClass">{{ initials }}</span>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    src: { type: String, default: '' },
    name: { type: String, required: true },
    frameClass: { type: [String, Object, Array], default: '' },
  },
  computed: {
    initials() {
      let name: any = this.name.replace(/[^a-zA-Z- ]/g, '')
      name = name.match(/\b\w/g)
      name = name.join('')
      name = name.substring(0, 2)

      return name
    },
  },
})
</script>
