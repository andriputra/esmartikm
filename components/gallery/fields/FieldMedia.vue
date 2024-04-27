<template>
  <field
    :label="$t('Image')"
    :error="'media' in errors"
    :feedback="errors.media"
    inline
    required
  >
    <div class="flex items-center space-x-3">
      <avatar
        v-if="attrs.media_thumbnail_url"
        :src="attrs.media_thumbnail_url"
        :origin="attrs.media_url"
        :name="attrs.title"
      />
      <file-input
        accept="image/png,image/jpg,image/jpeg,image/gif,image/tiff,application/pdf"
        :error="'media' in errors"
        :disabled="saving"
        class="flex-1"
        :label-placeholder="attrs.media ? 'Browse to change...' : undefined"
        @input="updateAttrs({ key: 'media', value: $event })"
      />
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import Avatar from '~/components/user/Avatar.vue'
import FileInput from '~/components/form/FileInput.vue'

export default Vue.extend({
  components: { Avatar, FileInput },
  mixins: [mixin],
})
</script>
