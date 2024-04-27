<template>
  <field
    :label="$t('Owner ID Card')"
    :error="'ktp_image' in errors"
    :feedback="errors.ktp_image"
    inline
    required
  >
    <div class="flex items-center space-x-3">
      <avatar
        v-if="attrs.ktp_thumbnail_url"
        :src="attrs.ktp_thumbnail_url"
        :origin="attrs.ktp_image_url"
        :name="attrs.name"
      />
      <file-input
        accept="image/png,image/jpg,image/jpeg,image/gif,image/tiff,application/pdf"
        :error="'ktp_image' in errors"
        :disabled="saving"
        class="flex-1"
        :label-placeholder="attrs.ktp_image ? 'Browse to change...' : undefined"
        @input="updateAttrs({ key: 'ktp_image', value: $event })"
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
