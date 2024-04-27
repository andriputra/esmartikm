<template>
  <field
    :label="$t('Product Photo')"
    :error="'product_image' in errors"
    :feedback="errors.product_image"
    inline
    accept=".jpg,.jpeg,.png"
  >
    <div class="flex items-center space-x-3">
      <avatar
        v-if="attrs.product_thumbnail_url"
        :src="attrs.product_thumbnail_url"
        :origin="attrs.product_image_url"
        :name="attrs.name"
      />
      <file-input
        accept="image/png,image/jpg,image/jpeg,image/gif,image/tiff"
        :error="'product_image' in errors"
        :disabled="saving"
        class="flex-1"
        :label-placeholder="
          attrs.product_image ? 'Browse to change...' : undefined
        "
        @input="updateAttrs({ key: 'product_image', value: $event })"
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
