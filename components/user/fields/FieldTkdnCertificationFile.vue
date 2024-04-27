<template>
  <field
    :label="$t('Upload TKDN Certification')"
    :error="'tkdn_certification_file' in errors"
    :feedback="errors.tkdn_certification_file"
    inline
  >
    <div class="flex items-center space-x-3">
      <a
        v-if="attrs.tkdn_certification_file_url"
        :href="attrs.tkdn_certification_file_url"
        target="_blank"
        ><svg-icon name="file_present"
      /></a>
      <file-input
        :error="'tkdn_certification_file' in errors"
        :disabled="saving"
        class="flex-1"
        :label-placeholder="
          attrs.tkdn_certification_file ? 'Browse to change...' : undefined
        "
        @input="updateAttrs({ key: 'tkdn_certification_file', value: $event })"
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
