<template>
  <div>
    <field-title />
    <field-event />
    <field-type @change="handleTypeChange" />
    <template v-if="attrs.type === 'image'">
      <field-media />
    </template>
    <template v-if="attrs.type === 'video'">
      <field-youtube />
    </template>
    <field-description />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import FieldTitle from '~/components/gallery/fields/FieldTitle.vue'
import FieldEvent from '~/components/gallery/fields/FieldEvent.vue'
import FieldType from '~/components/gallery/fields/FieldType.vue'
import FieldMedia from '~/components/gallery/fields/FieldMedia.vue'
import FieldYoutube from '~/components/gallery/fields/FieldYoutube.vue'
import FieldDescription from '~/components/gallery/fields/FieldDescription.vue'

export default Vue.extend({
  components: {
    FieldTitle,
    FieldEvent,
    FieldType,
    FieldMedia,
    FieldYoutube,
    FieldDescription,
  },
  computed: mapState('gallery/model', ['attrs']),
  methods: {
    ...mapMutations('gallery/model', {
      updateAttrs: 'UPDATE_ATTRS',
    }),
    handleTypeChange() {
      if (
        this.attrs.type === 'image' ||
        (this.attrs.type === 'video' && this.attrs.media !== 'string')
      ) {
        this.updateAttrs({ key: 'media', value: '' })
        this.updateAttrs({ key: 'media_thumbnail_url', value: '' })
        this.updateAttrs({ key: 'media_url', value: '' })
      }
    },
  },
})
</script>
