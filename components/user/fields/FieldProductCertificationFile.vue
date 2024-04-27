<template>
  <field
    v-if="attrs.form_type === 'Industri Pangan, Furnitur dan Bahan Bangunan'"
    :label="$t('Upload Product Certification')"
    :error="'product_certification_file' in errors"
    :feedback="errors.product_certification_file"
    inline
  >
    <div class="flex items-center space-x-3">
      <a
        v-if="attrs.product_certification_file_url"
        :href="attrs.product_certification_file_url"
        target="_blank"
        ><svg-icon name="file_present"
      /></a>
      <file-input
        :error="'product_certification_file' in errors"
        :disabled="saving"
        class="flex-1"
        :label-placeholder="
          attrs.product_certification_file ? 'Browse to change...' : undefined
        "
        @input="
          updateAttrs({ key: 'product_certification_file', value: $event })
        "
      />
    </div>
  </field>

  <field
    v-else
    :label="$t('Upload Product Certification')"
    :error="'product_certification_file' in errors"
    :feedback="errors.product_certification_file"
    inline
  >
    <div class="flex items-center space-x-3">
      <a
        v-if="attrs.product_certification_file_url"
        :href="attrs.product_certification_file_url"
        target="_blank"
        ><svg-icon name="file_present"
      /></a>
      <file-input
        :error="'product_certification_file' in errors"
        :disabled="saving"
        class="flex-1"
        :label-placeholder="
          attrs.product_certification_file ? 'Browse to change...' : undefined
        "
        @input="
          updateAttrs({ key: 'product_certification_file', value: $event })
        "
      />
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import FileInput from '~/components/form/FileInput.vue'

export default Vue.extend({
  components: { FileInput },
  mixins: [mixin],
})
</script>
