<template>
  <field
    :label="$t('NPWP Image')"
    :error="'npwp_image' in errors"
    :feedback="errors.npwp_image"
    inline
  >
    <div class="flex items-center space-x-3">
      <avatar
        v-if="attrs.npwp_thumbnail_url"
        :src="attrs.npwp_thumbnail_url"
        :origin="attrs.npwp_image_url"
        :name="attrs.name"
      />
      <file-input
        accept="image/png,image/jpg,image/jpeg,image/gif,image/tiff"
        :error="'npwp_image' in errors"
        :disabled="saving"
        class="flex-1"
        :label-placeholder="
          attrs.npwp_image ? 'Browse to change...' : undefined
        "
        @input="updateAttrs({ key: 'npwp_image', value: $event })"
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
